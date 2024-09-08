import { Module } from '@nestjs/common';
import { RedirectionController } from './redirection-controller';
import { UserRedirectionController } from './user-redirection-controller';
import { UserProfileController } from './user-profile-controller';
import { AuthController } from './auth-controller';
import { UserController } from './user-controller';
import { CoreModule } from '../../core/core-module';

@Module({
    imports: [CoreModule],
    controllers: [
        RedirectionController,
        UserRedirectionController,
        UserProfileController,
        AuthController,
        UserController,
    ],
})
export class WebApiModule {}
