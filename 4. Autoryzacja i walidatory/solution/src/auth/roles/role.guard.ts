import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from "./role.decorator";
import {Role} from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        if (user?.roles === undefined) return false;
        return requiredRoles.some((role) => user.roles.includes(role));
    }
}
