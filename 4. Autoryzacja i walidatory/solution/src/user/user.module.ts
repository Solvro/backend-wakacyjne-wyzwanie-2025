import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from "./user.controller";
import {AuthService} from "../auth/auth.service";
import {RoleGuard} from "../auth/roles/role.guard";
import {DatabaseModule} from "../database/database.module";

@Module({
    providers: [UserService, AuthService, RoleGuard],
    exports: [UserService],
    imports: [DatabaseModule],
    controllers: [UserController]
})
export class UserModule {
}
