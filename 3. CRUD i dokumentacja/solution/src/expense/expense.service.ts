import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private prisma: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: createExpenseDto.tripId },
    });

    if (trip === null) {
      throw new NotFoundException(
        `Trip with ID ${createExpenseDto.tripId.toString()} not found`,
      );
    }

    return this.prisma.expense.create({
      data: {
        amount: createExpenseDto.amount,
        currency: createExpenseDto.currency,
        category: createExpenseDto.category,
        trip: {
          connect: { id: createExpenseDto.tripId },
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
    return this.prisma.expense.findMany({
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
    const expense = await this.prisma.expense.findUnique({
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

    if (expense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (existingExpense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }

    if (updateExpenseDto.tripId != null) {
      const trip = await this.prisma.trip.findUnique({
        where: { id: updateExpenseDto.tripId },
      });

      if (trip === null) {
        throw new NotFoundException(
          `Trip with ID ${updateExpenseDto.tripId.toString()} not found`,
        );
      }
    }

    return this.prisma.expense.update({
      where: { id },
      data: {
        amount: updateExpenseDto.amount,
        currency: updateExpenseDto.currency,
        category: updateExpenseDto.category,
        ...(updateExpenseDto.tripId != null && {
          trip: {
            connect: { id: updateExpenseDto.tripId },
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
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (expense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }

    await this.prisma.expense.delete({
      where: { id },
    });

    return { message: `Expense with ID ${id.toString()} deleted successfully` };
  }
}
