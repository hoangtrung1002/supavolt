import { inviteSchema, updateRoleSchema } from "./client.schema";
import { MEMBER_INTENT } from "./constants";
import { z } from "zod";

export const membersServerSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal(MEMBER_INTENT.INVITE),
    ...inviteSchema.shape,
  }),
  z.object({
    intent: z.literal(MEMBER_INTENT.UPDATE_ROLE),
    memberId: z.string(),
    ...updateRoleSchema.shape,
  }),
  z.object({
    intent: z.literal(MEMBER_INTENT.REMOVE),
    memberId: z.string(),
  }),
]);
