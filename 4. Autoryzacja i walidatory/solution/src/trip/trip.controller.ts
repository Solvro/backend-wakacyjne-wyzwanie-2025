import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post,} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {CreateTripResponseDto} from "./dto/create-trip-reponse.dto";
import {CreateTripDto} from "./dto/create-trip.dto";
import {UpdateTripDto} from "./dto/update-trip.dto";
import {TripService} from "./trip.service";

@Controller("trip")
@ApiTags("trips")
export class TripController {
    constructor(private readonly tripService: TripService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: "Create a new trip",
        description:
            "Add a trip to which you can supply new expenses and participants",
    })
    @ApiResponse({
        status: 201,
        description: "Trip created",
        type: CreateTripResponseDto,
    })
    async create(@Body() createTripDto: CreateTripDto) {
        return this.tripService.create(createTripDto);
    }

    @Get()
    async findAll() {
        return this.tripService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.tripService.findOne(+id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
        return this.tripService.update(+id, updateTripDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.tripService.remove(+id);
    }
}
