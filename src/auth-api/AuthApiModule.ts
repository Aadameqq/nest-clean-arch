import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { ConfigurationModule } from '../configuration/configuration.module';
import { AuthModule } from '../auth/AuthModule';

@Module({
    controllers: [AuthController],
    providers: [],
    imports: [ConfigurationModule, AuthModule],
})
export class AuthApiModule {}
