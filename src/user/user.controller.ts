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
  async createUser(@Body() data: Omit<Prisma.UserCreateInput, 'name'>): Promise<User> {

    return this.prisma.user.create({
      data: {
        name: this.randomNickname(),
        ...data,
      },
    });
  }

  randomNickname(): string {
    const prefix = [
      '귀여운',
      '멋진',
      '똑똑한',
      '용감한',
      '행운의',
      '미친',
      '사랑스러운',
      '화려한',
      '강력한',
      '재미있는',
    ];
    const name = [
      '사슴',
      '고양이',
      '강아지',
      '팬더',
      '호랑이',
      '토끼',
      '사자',
      '코끼리',
      '치타',
      '여우',
    ];

    return `${prefix[Math.floor(Math.random() * prefix.length)]} ${
      name[Math.floor(Math.random() * name.length)]
    }`;
  }
}
