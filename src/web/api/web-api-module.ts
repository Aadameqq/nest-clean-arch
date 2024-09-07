import { Module } from '@nestjs/common';
import { RedirectionController } from './redirection-controller';
import { UserRedirectionController } from './user-redirection-controller';
import { UserProfileController } from './user-profile-controller';
import { AuthController } from './auth-controller';
import { UserController } from './user-controller';
import { CoreModule } from '../../core/core-module';
import { ShortenedUrlGenerator } from './shortened-url-generator';

@Module({
    imports: [CoreModule],
    controllers: [
        RedirectionController,
        UserRedirectionController,
        UserProfileController,
        AuthController,
        UserController,
    ],
    providers: [ShortenedUrlGenerator],
})
export class WebApiModule {}
