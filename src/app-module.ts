import { Module } from '@nestjs/common';
import { CoreModule } from './core/core-module';
import { WebModule } from './web/web-module';

@Module({
    imports: [CoreModule, WebModule],
})
export class AppModule {}
