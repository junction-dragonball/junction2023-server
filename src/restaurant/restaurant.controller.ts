import { Body, Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Quest, Restaurant, User } from '@prisma/client';

@Controller('restaurant')
export class RestaurantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllRestaurant() {
    // TODO: menu summary

    return this.prisma.restaurant.findMany({
      where: {
        available: true,
      },
      include: {
        menus: true,
      },
    });
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string) {
    return this.prisma.restaurant.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        menus: true,
      },
    });
  }
}
