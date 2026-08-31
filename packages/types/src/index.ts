export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrgRole = "admin" | "developer";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrgMember {
  id: string;
  orgId: string;
  userId: string;
  role: OrgRole;
  createdAt: Date;
}

export interface Project {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  dbSchema: string;
  projectUrl: string;
  anonKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}
export interface CreateOrgInput {
  name: string;
}

export interface OrganizationWithMeta extends Organization {
  memberCount: number;
  projectCount: number;
  role: OrgRole;
}

export interface OrgMemberWithUser {
  id: string;
  role: OrgRole;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  };
}

export interface InviteMemberInput {
  email: string;
}

export interface UpdateRoleInput {
  role: OrgRole;
}
