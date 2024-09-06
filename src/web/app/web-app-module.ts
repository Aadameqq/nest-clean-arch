import { Module } from '@nestjs/common';
import { RedirectController } from './redirect-controller';
import { AuthModule } from '../auth/auth-module';
import { CoreModule } from '../../core/core.module';

@Module({
    imports: [AuthModule, CoreModule],
    controllers: [RedirectController],
})
export class WebAppModule {}
