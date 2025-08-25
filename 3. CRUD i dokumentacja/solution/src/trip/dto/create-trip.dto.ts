import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2024",
    minLength: 1,
  })
  @IsString()
  @MinLength(1, { message: "Trip name must not be empty" })
  name: string;

  @ApiPropertyOptional({
    description: "Planned budget for the trip",
    example: 5000,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  plannedBudget?: number;

  @ApiPropertyOptional({
    description: "Array of expenses (typically not used when creating trip)",
    isArray: true,
    readOnly: true,
  })
  @IsArray()
  @IsOptional()
  expenses?: unknown[];

  @ApiPropertyOptional({
    description:
      "Array of participants (typically not used when creating trip)",
    isArray: true,
    readOnly: true,
  })
  @IsArray()
  @IsOptional()
  participants?: unknown[];
}
