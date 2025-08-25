import { Category } from "@prisma/client";
import { IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({
    description: "Expense amount",
    example: 150.75,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: "Currency code",
    example: "USD",
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: "Expense category",
    enum: Category,
    example: Category.FOOD,
  })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({
    description: "ID of the trip this expense belongs to",
    example: 1,
  })
  @IsNumber()
  tripId: number;
}
