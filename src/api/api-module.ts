import { Module } from '@nestjs/common';
import { RedirectController } from './redirect-controller';
import { CoreModule } from '../core/core.module';
import { UserRedirectController } from './user-redirect-controller';

@Module({
    controllers: [RedirectController, UserRedirectController],
    imports: [CoreModule],
})
export class ApiModule {}
