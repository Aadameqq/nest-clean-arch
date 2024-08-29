import { Injectable } from '@nestjs/common';
import { UserProfile } from './UserProfile';
import { UserProfileId } from './UserProfileId';
import { UserProfileRepository } from './UserProfileRepository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserProfileRepository implements UserProfileRepository {
    public constructor(private prismaService: PrismaService) {}

    async findById(userProfileId: UserProfileId): Promise<UserProfile | false> {
        const found = await this.prismaService.user.findUnique({
            where: {
                id: userProfileId.toString(),
            },
        });

        if (!found) return false;

        return new UserProfile(userProfileId, found.displayName, found.bio);
    }
}
