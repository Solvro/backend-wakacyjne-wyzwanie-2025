import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateTripResponseDto {
    @ApiProperty()
    id: number;

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

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
