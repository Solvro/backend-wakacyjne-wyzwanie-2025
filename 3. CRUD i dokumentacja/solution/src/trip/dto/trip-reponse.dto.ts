import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { ExpenseResponseDto } from "../../expense/dto/expense-response.dto";
import { ParticipantResponseDto } from "../../participant/dto/participant-response.dto";

export class TripResponseDto {
  @ApiProperty({
    description: "Unique identifier of the trip",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2024",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Planned budget for the trip",
    example: 5000,
    nullable: true,
  })
  plannedBudget?: number;

  @ApiProperty({
    description: "Date when the trip was created",
    example: "2024-01-15T10:30:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the trip was last updated",
    example: "2024-01-15T10:30:00.000Z",
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: "Array of expenses belonging to this trip",
    type: [ExpenseResponseDto],
    isArray: true,
  })
  expenses?: ExpenseResponseDto[];

  @ApiPropertyOptional({
    description: "Array of participants in this trip",
    type: [ParticipantResponseDto],
    isArray: true,
  })
  participants?: ParticipantResponseDto[];
}
