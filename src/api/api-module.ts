import { Module } from '@nestjs/common';
import { AuthController } from './auth-controller';
import { RedirectController } from './redirect-controller';
import { UserProfileController } from './user-profile-controller';

@Module({
    controllers: [AuthController, RedirectController, UserProfileController],
})
export class ApiModule {}
