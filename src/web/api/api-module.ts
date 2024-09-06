import { Module } from '@nestjs/common';
import { RedirectionController } from './redirection-controller';
import { UserRedirectionController } from './user-redirection-controller';
import { UserProfileController } from './user-profile-controller';
import { WebAuthController } from './web-auth-controller';
import { UserController } from './user-controller';
import { AuthModule } from '../auth/auth-module';
import { CoreModule } from '../../core/core.module';

@Module({
    imports: [AuthModule, CoreModule],
    controllers: [
        RedirectionController,
        UserRedirectionController,
        UserProfileController,
        WebAuthController,
        UserController,
    ],
})
export class ApiModule {}
