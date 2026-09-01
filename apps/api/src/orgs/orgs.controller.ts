import { Controller, Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from '@supavolt/types';

@Controller('orgs')
@UseGuards(JwtAuthGuard)
export class OrgsController {
  constructor(private orgsService: OrgsService) {}

  @Get()
  getMyOrgs(@CurrentUser() user: JwtPayload) {
    return this.orgsService.getMyOrgs(user.sub);
  }

  @Get(':slug')
  getOrgBySlug(@Param('slug') slug: string, @CurrentUser() user: JwtPayload) {
    return this.orgsService.getOrgBySlug(slug, user.sub);
  }
  @Post()
  CreateOrgDto(@Body() dto: CreateOrgDto, @CurrentUser() user: JwtPayload) {
    return this.orgsService.createOrg(dto, user.sub);
  }
}
