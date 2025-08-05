import { Controller, Get } from '@nestjs/common';
import { PrismaClient, Trip as TripModel } from '@prisma/client';

@Controller('database')
export class DatabaseController {
    private prisma = new PrismaClient();

    @Get('/testRead')
    async testRead(): Promise<TripModel[]> {
        return await this.prisma.trip.findMany();
    }

    @Get('/testCreate')
    async testCreate(): Promise<void> {
        await this.prisma.trip.create({
            data: {
                id: 9999,
                name: 'Test Trip',
                createdAt: new Date(),
            },
        });
    }
}
