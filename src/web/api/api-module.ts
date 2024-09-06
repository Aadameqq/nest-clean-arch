import { Module } from '@nestjs/common';
import { RedirectController } from './redirect-controller';
import { UserRedirectController } from './user-redirect-controller';
import { UserProfileController } from './user-profile-controller';
import { AuthController } from './auth-controller';
import { UserController } from './user-controller';
import { AuthModule } from '../auth/auth-module';
import { CoreModule } from '../../core/core.module';

@Module({
    imports: [AuthModule, CoreModule],
    controllers: [
        RedirectController,
        UserRedirectController,
        UserProfileController,
        AuthController,
        UserController,
    ],
})
export class ApiModule {}
