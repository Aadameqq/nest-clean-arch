import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api-module';

@Module({
    imports: [ConfigurationModule, CoreModule, ApiModule],
    providers: [],
})
export class AppModule {}
