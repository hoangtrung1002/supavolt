import { ORG_ROLES } from "@supavolt/constants";
import { z } from "zod";
import type { InviteMemberInput, UpdateRoleInput } from "@supavolt/types";

export const inviteSchema = z.object({
  email: z.email("Invalid email"),
}) satisfies z.ZodType<InviteMemberInput>;

export const updateRoleSchema = z.object({
  role: z.enum([ORG_ROLES.ADMIN, ORG_ROLES.DEVELOPER]),
}) satisfies z.ZodType<UpdateRoleInput>;
