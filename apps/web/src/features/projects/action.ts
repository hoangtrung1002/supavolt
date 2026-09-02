"use server";

import { revalidatePath } from "next/cache";
import { projectServerSchema } from "./server.schema";
import { PROJECT_INTENT } from "./constants";
import { COOKIE_KEYS } from "@supavolt/constants";
import { retrieveTokenFromCookie } from "@/server-utils/utils";
import { z } from "zod";
import apiClient from "@/lib/axios";

export type ProjectActionState = {
  error?: string;
  success?: string;
};

export async function projectsAction(
  { slug }: { slug: string },
  _prev: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const raw = Object.fromEntries(formData);
  const parsed = projectServerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: z.flattenError(parsed.error).formErrors[0] ?? "Invalid input",
    };
  }
  const token = await retrieveTokenFromCookie();
  const { intent, ...data } = parsed.data;

  try {
    switch (intent) {
      case PROJECT_INTENT.CREATE: {
        await apiClient.post(
          `orgs/${slug}/projects`,
          {
            name: (data as { name: string }).name,
          },
          { headers: { Cookie: `${COOKIE_KEYS.ACCESS_TOKEN}=${token}` } },
        );
        revalidatePath(`/organizations/${slug}/projects`);
        return { success: "Project created" };
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.response?.data?.message ?? "Something went wrong" };
  }
}
