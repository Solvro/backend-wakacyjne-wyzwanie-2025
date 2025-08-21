import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsString, Length, Min} from "class-validator";

export class CreateTripDto {
    @ApiProperty()
    @IsString()
    @Length(3, 255)
    name: string;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
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
