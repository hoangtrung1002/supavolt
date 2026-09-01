"use server";

import { revalidatePath } from "next/cache";
import { membersServerSchema } from "./server.schema";
import { MEMBER_INTENT } from "./constants";
import { COOKIE_KEYS } from "@supavolt/constants";
import { retrieveTokenFromCookie } from "@/server-utils/utils";
import apiClient from "@/lib/axios";
import { z } from "zod";

export type MemberActionState = {
  error?: string;
  success?: string;
};

export async function membersAction(
  { slug }: { slug: string },
  _prev: MemberActionState,
  formData: FormData,
): Promise<MemberActionState> {
  const raw = Object.fromEntries(formData);
  const parsed = membersServerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: z.flattenError(parsed.error).formErrors[0] ?? "Invalid input",
    };
  }
  const token = await retrieveTokenFromCookie();
  const { intent, ...data } = parsed.data;

  try {
    switch (intent) {
      case MEMBER_INTENT.INVITE: {
        await apiClient.post(
          `/orgs/${slug}/members/invite`,
          {
            email: (data as { email: string }).email,
          },
          { headers: { Cookie: `${COOKIE_KEYS.ACCESS_TOKEN}=${token}` } },
        );
        revalidatePath(`organizations/${slug}/settings/members`);
        return { success: "Invite sent" };
      }
      case MEMBER_INTENT.UPDATE_ROLE: {
        const { memberId, role } = data as { memberId: string; role: string };
        await apiClient.patch(
          `/orgs/${slug}/members/${memberId}/role`,
          { role },
          { headers: { Cookie: `${COOKIE_KEYS.ACCESS_TOKEN}=${token}` } },
        );
        revalidatePath(`organizations/${slug}/settings/members`);
        return { success: "Role updated" };
      }
      case MEMBER_INTENT.REMOVE: {
        const { memberId } = data as { memberId: string };
        await apiClient.delete(`/orgs/${slug}/members/${memberId}`, {
          headers: { Cookie: `${COOKIE_KEYS.ACCESS_TOKEN}=${token}` },
        });
        revalidatePath(`organization/${slug}/settings/members`);
        return { success: "Member removed" };
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.response?.data?.message ?? "Something went wrong" };
  }
}
