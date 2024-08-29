import { Module } from '@nestjs/common';
import { RedirectController } from './RedirectController';
import { AuthModule } from '../auth/AuthModule';
import { RedirectModule } from '../redirect/RedirectModule';

@Module({
    imports: [AuthModule, RedirectModule],
    controllers: [RedirectController],
})
export class RedirectApiModule {}
