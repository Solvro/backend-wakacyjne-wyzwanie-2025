import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, Length, Min} from "class-validator";

export class CreateTripDto {
    @ApiProperty()
    @IsString()
    @Length(3, 255)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(0)
    plannedBudget?: number;

    @IsOptional()
    @ApiPropertyOptional({
        isArray: true,
    })
    expenses?: unknown[];

    @IsOptional()
    @ApiPropertyOptional({
        isArray: true,
    })
    participants?: unknown[];
}
