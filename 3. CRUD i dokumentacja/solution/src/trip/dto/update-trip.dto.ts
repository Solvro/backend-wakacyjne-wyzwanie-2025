import { PartialType } from "@nestjs/mapped-types";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  name?: string;
  plannedBudget?: number;
  expenses?: unknown[];
  participants?: unknown[];
}
