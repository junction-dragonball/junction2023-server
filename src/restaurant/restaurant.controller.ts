import { Body, Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Quest, Restaurant, User } from '@prisma/client';

type RestaurantListing = Pick<Restaurant, 'name' | 'thumbnailUrl' | 'rating'>;

@Controller('restaurant')
export class RestaurantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllRestaurant(): Promise<RestaurantListing[]> {
    // TODO: menu summary

    return this.prisma.restaurant.findMany({
      select: {
        name: true,
        thumbnailUrl: true,
        rating: true,
      },
      where: {
        available: true,
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
