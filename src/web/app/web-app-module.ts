import { Module } from '@nestjs/common';
import { RedirectionController } from './redirection-controller';
import { CoreModule } from '../../core/core-module';

@Module({
    imports: [CoreModule],
    controllers: [RedirectionController],
})
export class WebAppModule {}
