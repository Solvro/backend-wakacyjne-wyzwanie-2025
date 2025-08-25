import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ParticipantResponseDto {
  @ApiProperty({
    description: "Unique identifier of the participant",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Email address of the participant",
    example: "john.doe@example.com",
  })
  email: string;

  @ApiPropertyOptional({
    description: "Name of the participant",
    example: "John Doe",
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    description: "Amount the participant needs to pay",
    example: 250.75,
  })
  amountToPay: number;

  @ApiProperty({
    description: "ID of the trip this participant belongs to",
    example: 1,
  })
  tripId: number;

  @ApiProperty({
    description: "Date when the participant was created",
    example: "2024-01-15T10:30:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the participant was last updated",
    example: "2024-01-15T10:30:00.000Z",
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: "Trip information (if included)",
    type: "object",
    properties: {
      id: { type: "number", example: 1 },
      name: { type: "string", example: "Summer Vacation" },
      plannedBudget: { type: "number", example: 1000, nullable: true },
    },
  })
  trip?: {
    id: number;
    name: string;
    plannedBudget?: number;
  };
}
