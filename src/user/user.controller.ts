import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, User } from "@prisma/client";

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
