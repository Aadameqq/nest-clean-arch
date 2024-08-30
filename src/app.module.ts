import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api-module';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigurationModule,
        CoreModule,
        ApiModule,
    ],
    providers: [],
})
export class AppModule {}
