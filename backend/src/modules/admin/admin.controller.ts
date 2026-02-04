import { Body, Controller, Get, NotFoundException, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminService, AdminUserDetail } from './admin.service';
import { AdminGuard } from './admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers(
    @Query('page') page = '1'
  ): { users: AdminUserDetail[]; page: number; totalPages: number } {
    return this.adminService.getUsers(Number(page));
  }

  @Get('users/:id')
  getUser(@Param('id') id: string): AdminUserDetail {
    const user = this.adminService.getUser(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() payload: Partial<AdminUserDetail>): AdminUserDetail {
    const user = this.adminService.updateUser(Number(id), payload);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
