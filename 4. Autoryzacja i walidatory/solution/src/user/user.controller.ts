import {Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserUpdateDto} from "./dto/user-update.dto";
import {UserUpdateResponseDto} from "./dto/user-update-response.dto";
import {AuthGuard} from "../auth/auth.guard";
import {Roles} from "../auth/roles/role.decorator";
import {UserMetadata} from "./dto/user-metadata";
import {RoleGuard} from "../auth/roles/role.guard";
import {Role} from '@prisma/client';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@Controller("user")
@ApiTags("user")
export class UserController {

    constructor(private userService: UserService) {
    }

    @ApiOperation({
        summary: "Update the personal data of a user",
    })
    @ApiResponse({
        status: 200,
        description: "Field(s) updated",
    })
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Patch("")
    async updateUserData(@Request() request: {
        user: UserMetadata
    }, @Body() updateRequest: UserUpdateDto): Promise<UserUpdateResponseDto> {
        return this.userService.updateUserData(request.user.email, updateRequest.newAboutMe, updateRequest.name);
    }

    @ApiOperation({
        summary: "Disable the given user account",
    })
    @ApiResponse({
        status: 204,
        description: "User disabled",
    })
    @ApiResponse({
        status: 400,
        description: "Cannot disable an admin account",
    })
    @ApiResponse({
        status: 403,
        description: "Missing privileges",
    })
    @ApiResponse({
        status: 404,
        description: "User not found",
    })
    @UseGuards(AuthGuard, RoleGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('disable/:email')
    @Roles(Role.ADMIN)
    async disableUser(@Param('email') email: string) {
        return this.userService.disableAccount(email);
    }

    @ApiOperation({
        summary: "Enable the given user account",
    })
    @ApiResponse({
        status: 204,
        description: "User enabled",
    })
    @ApiResponse({
        status: 403,
        description: "Missing privileges",
    })
    @ApiResponse({
        status: 404,
        description: "User not found",
    })
    @UseGuards(AuthGuard, RoleGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('enable/:email')
    @Roles(Role.ADMIN)
    async enableUser(@Param('email') email: string) {
        return this.userService.enableAccount(email);
    }

}
