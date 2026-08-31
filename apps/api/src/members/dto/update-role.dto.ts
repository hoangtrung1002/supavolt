import { ORG_ROLES } from '@supavolt/constants';
import { IsEnum } from 'class-validator';
import type { OrgRole } from '@supavolt/types';

export class UpdateRoleDto {
  @IsEnum(ORG_ROLES)
  role!: OrgRole;
}
