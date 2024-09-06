import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { WebModule } from './web/web-module';

@Module({
    imports: [ConfigurationModule, CoreModule, WebModule],
})
export class AppModule {}
