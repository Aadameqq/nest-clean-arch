import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WebApiModule } from './api/web-api-module';
import { WebAppModule } from './app/web-app-module';

@Module({
    imports: [
        RouterModule.register([{ path: 'api', module: WebApiModule }]),
        WebApiModule,
        WebAppModule,
    ],
})
export class WebModule {}
