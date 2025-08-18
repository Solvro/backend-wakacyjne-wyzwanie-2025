import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  plannedBudget?: number;
  @ApiPropertyOptional({
    isArray: true,
  })
  expenses?: unknown[];
  @ApiPropertyOptional({
    isArray: true,
  })
  participants?: unknown[];
}
