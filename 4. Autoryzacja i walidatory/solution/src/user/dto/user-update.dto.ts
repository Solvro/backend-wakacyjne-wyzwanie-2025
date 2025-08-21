import {IsString, MaxLength, Validate} from "class-validator";
import {NiceText} from "../../validators/niceTextValidator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UserUpdateDto {
    @IsString()
    @MaxLength(30)
    @Validate(NiceText)
    @ApiPropertyOptional()
    newAboutMe: string | null;
    @MaxLength(15)
    @IsString()
    @ApiPropertyOptional()
    name: string | null;
}