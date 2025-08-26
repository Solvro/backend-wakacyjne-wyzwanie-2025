import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { TripModule } from "./trip/trip.module";

@Module({
  imports: [DatabaseModule, TripModule, ExpenseModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
