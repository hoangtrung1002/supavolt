export const MEMBER_INTENT = {
  INVITE: "INVITE",
  UPDATE_ROLE: "UPDATE_ROLE",
  REMOVE: "REMOVE",
} as const;

export type MemberIntent = (typeof MEMBER_INTENT)[keyof typeof MEMBER_INTENT];
