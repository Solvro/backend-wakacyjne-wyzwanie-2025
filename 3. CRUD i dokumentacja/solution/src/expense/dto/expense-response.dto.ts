import { Category } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExpenseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ enum: Category })
  category: Category;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      plannedBudget: { type: "number", nullable: true },
    },
  })
  trip?: {
    id: number;
    name: string;
    plannedBudget?: number;
  };
}
