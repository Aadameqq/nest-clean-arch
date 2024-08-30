import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/AuthModule';
import { RedirectModule } from './redirect/RedirectModule';
import { PrismaModule } from './prisma/prisma.module';
import { RedirectApiModule } from './redirect-api/RedirectApiModule';
import { AuthApiModule } from './auth-api/AuthApiModule';
import { UserApiModule } from './user-api/UserApiModule';
import { UserProfileModule } from './user-profile/UserProfileModule';
import { UserProfileApiModule } from './user-profile-api/UserProfileApiModule';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api.module';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigurationModule,
        AuthModule,
        RedirectModule,
        PrismaModule,
        RedirectApiModule,
        AuthApiModule,
        UserApiModule,
        UserProfileModule,
        UserProfileApiModule,
        CoreModule,
        ApiModule,
    ],
    providers: [],
})
export class AppModule {}
