import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserProfileService } from './UserProfileService';
import { PrismaUserProfileRepository } from './PrismaUserProfileRepository';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: UserProfileService,
            useFactory: (
                userProfileRepository: PrismaUserProfileRepository,
            ) => {
                return new UserProfileService(userProfileRepository);
            },
            inject: [PrismaUserProfileRepository],
        },
        PrismaUserProfileRepository,
    ],
    exports: [UserProfileService],
})
export class UserProfileModule {}
