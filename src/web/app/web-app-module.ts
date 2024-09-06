import { Module } from '@nestjs/common';
import { RedirectionController } from './redirection-controller';
import { AuthModule } from '../auth/auth-module';
import { CoreModule } from '../../core/core.module';

@Module({
    imports: [AuthModule, CoreModule],
    controllers: [RedirectionController],
})
export class WebAppModule {}
