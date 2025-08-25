import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  amountToPay: number;

  @ApiProperty()
  tripId: number;
}
