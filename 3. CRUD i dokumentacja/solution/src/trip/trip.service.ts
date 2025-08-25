import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        name: createTripDto.name,
        plannedBudget: createTripDto.plannedBudget,
      },
      include: {
        expenses: true,
        participants: true,
      },
    });
  }

  async findAll() {
    return this.database.trip.findMany({
      include: {
        expenses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        participants: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { id },
      include: {
        expenses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        participants: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return trip;
  }

  async findOneWithDetails(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { id },
      include: {
        expenses: {
          orderBy: {
            createdAt: "desc",
          },
        },
        participants: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const existingTrip = await this.database.trip.findUnique({
      where: { id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return this.database.trip.update({
      where: { id },
      data: {
        name: updateTripDto.name,
        plannedBudget: updateTripDto.plannedBudget,
      },
      include: {
        expenses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        participants: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });
  }

  async remove(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { id },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    await this.database.expense.delete({ where: { id } });

    return { message: `Trip with ID ${id.toString()} deleted successfully` };
  }
}
