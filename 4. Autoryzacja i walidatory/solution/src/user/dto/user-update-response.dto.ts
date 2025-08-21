import {User} from "@prisma/client";

export interface UserUpdateResponseDto {
    aboutMe: string | null;
    name: string | null;
}

export function userToUserUpdateDto(user: User): UserUpdateResponseDto {
    return {
        aboutMe: user.aboutMe,
        name: user.name
    }
}