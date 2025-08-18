import { DatabaseService } from "src/database/database.service";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService, DatabaseService],
})
export class TripModule {}
