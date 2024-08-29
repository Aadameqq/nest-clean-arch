import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/AuthModule';
import { UserProfileModule } from '../user-profile/UserProfileModule';
import { UserProfileController } from './UserProfileController';

@Module({
    imports: [AuthModule, UserProfileModule],
    controllers: [UserProfileController],
})
export class UserProfileApiModule {}
