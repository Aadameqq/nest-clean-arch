import { Module } from '@nestjs/common';
import { AuthService } from './AuthService';
import { JsonwebtokenTokenManager } from './JsonwebtokenTokenManager';
import { ConfigurationModule } from '../configuration/configuration.module';
import { PrismaAuthUserRepository } from './PrismaAuthUserRepository';
import { BcryptPasswordHasher } from './BcryptPasswordHasher';
import { AuthUserFactory } from './AuthUserFactory';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    providers: [
        {
            provide: AuthService,
            useFactory: (
                authUserRepository: PrismaAuthUserRepository,
                tokenManager: JsonwebtokenTokenManager,
                passwordHasher: BcryptPasswordHasher,
            ) => {
                return new AuthService(
                    passwordHasher,
                    authUserRepository,
                    tokenManager,
                );
            },
            inject: [
                PrismaAuthUserRepository,
                JsonwebtokenTokenManager,
                BcryptPasswordHasher,
            ],
        },
        BcryptPasswordHasher,
        PrismaAuthUserRepository,
        JsonwebtokenTokenManager,
        {
            provide: AuthUserFactory,
            useFactory: (authUserRepository: PrismaAuthUserRepository) => {
                return new AuthUserFactory(authUserRepository);
            },
            inject: [PrismaAuthUserRepository],
        },
    ],
    imports: [ConfigurationModule, PrismaModule],
    exports: [AuthService, AuthUserFactory],
})
export class AuthModule {}
