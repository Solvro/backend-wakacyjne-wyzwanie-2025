import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {LoginResponseDto} from "./dto/login-response.dto";
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({
        summary: "Log in with an existing account",
    })
    @ApiResponse({
        status: 200,
        description: "Logged in",
    })
    @ApiResponse({
        status: 401,
        description: "Invalid credentials or account disabled",
    })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

}
