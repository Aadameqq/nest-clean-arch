import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from './api/api-module';
import { WebAppModule } from './app/web-app-module';

@Module({
    imports: [
        RouterModule.register([{ path: 'api', module: ApiModule }]),
        ApiModule,
        WebAppModule,
    ],
})
export class WebModule {}
