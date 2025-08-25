import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const trip = await this.database.trip.findUnique({
      where: { id: createParticipantDto.tripId },
    });

    if (trip === null) {
      throw new NotFoundException(
        `Trip with ID ${createParticipantDto.tripId.toString()} not found`,
      );
    }

    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        amountToPay: createParticipantDto.amountToPay,
        trip: {
          connect: { id: createParticipantDto.tripId },
        },
      },
      include: {
        trip: {
          select: {
            id: true,
            name: true,
            plannedBudget: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany({
      include: {
        trip: {
          select: {
            id: true,
            name: true,
            plannedBudget: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { id },
      include: {
        trip: {
          select: {
            id: true,
            name: true,
            plannedBudget: true,
          },
        },
      },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const existingParticipant = await this.database.participant.findUnique({
      where: { id },
    });

    if (existingParticipant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    if (updateParticipantDto.tripId !== undefined) {
      const trip = await this.database.trip.findUnique({
        where: { id: updateParticipantDto.tripId },
      });

      if (trip === null) {
        throw new NotFoundException(
          `Trip with ID ${updateParticipantDto.tripId.toString()} not found`,
        );
      }
    }

    return this.database.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        email: updateParticipantDto.email,
        amountToPay: updateParticipantDto.amountToPay,
        ...(updateParticipantDto.tripId != null && {
          trip: {
            connect: { id: updateParticipantDto.tripId },
          },
        }),
      },
      include: {
        trip: {
          select: {
            id: true,
            name: true,
            plannedBudget: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    await this.database.participant.delete({
      where: { id },
    });

    return {
      message: `Participant with ID ${id.toString()} deleted successfully`,
    };
  }
}
