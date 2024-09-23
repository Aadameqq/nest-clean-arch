import { Module } from '@nestjs/common';
import { WebModule } from './web/web-module';
import { CoreModule } from './core/core-module';

@Module({
    imports: [CoreModule, WebModule],
})
export class AppModule {}
