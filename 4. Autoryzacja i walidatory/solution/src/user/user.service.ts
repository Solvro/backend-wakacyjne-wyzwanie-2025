import {Injectable, NotFoundException} from '@nestjs/common';
import {UserUpdateResponseDto} from "./dto/user-update-response.dto";
import {UserMetadata, userToMetadata} from "./dto/user-metadata";
import {DatabaseService} from "../database/database.service";
import {User} from '@prisma/client';

@Injectable()
export class UserService {

    constructor(private databaseService: DatabaseService) {
    }

    async disableAccount(email: string) {
        const user = await this.findByIdOrFail(email);
        user.isEnabled = false;
        await this.mergeUser(user);
    }

    async enableAccount(email: string) {
        const user = await this.findByIdOrFail(email);
        user.isEnabled = true;
        await this.mergeUser(user);
    }

    async findOne(email: string): Promise<User | null> {
        return this.databaseService.user.findUnique({where: {email}});
    }

    async findMetadataOrFail(email: string): Promise<UserMetadata> {
        return userToMetadata(await this.findByIdOrFail(email))
    }

    async updateUserData(email: string, newAboutMe: string | null, newName: string | null): Promise<UserUpdateResponseDto> {
        const user = await this.findByIdOrFail(email);
        user.name = newName;
        user.aboutMe = newAboutMe;
        return await this.mergeUser(user);
    }

    private async mergeUser(user: User): Promise<User> {
        return await this.databaseService.user.update({
            where: {email: user.email},
            data: {
                ...user
            },
        })
    }

    private async findByIdOrFail(email: string): Promise<User> {
        const found = await this.databaseService.user.findUnique({where: {email}});
        if (found === null) throw new NotFoundException("User not found");
        return found;
    }
}
