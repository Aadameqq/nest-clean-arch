import { Module } from '@nestjs/common';
import { RedirectController } from './redirect-controller';
import { CoreModule } from '../core/core.module';
import { UserRedirectController } from './user-redirect-controller';
import { UserProfileController } from './user-profile-controller';
import { AuthController } from './auth-controller';
import { UserController } from './user-controller';

@Module({
    controllers: [
        RedirectController,
        UserRedirectController,
        UserProfileController,
        AuthController,
        UserController,
    ],
    imports: [CoreModule],
})
export class ApiModule {}
