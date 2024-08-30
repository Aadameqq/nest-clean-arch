import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-variables.entity';
import { ConfigurationService } from './configuration.service';

@Module({
    imports: [ConfigModule.forRoot({ validate })],
    providers: [ConfigurationService],
    exports: [ConfigurationService],
})
@Global() //TODO:
export class ConfigurationModule {}
