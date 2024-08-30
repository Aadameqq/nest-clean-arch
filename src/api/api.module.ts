import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { RedirectController } from './RedirectController';
import { UserProfileController } from './UserProfileController';

@Module({
    controllers: [AuthController, RedirectController, UserProfileController],
})
export class ApiModule {}
