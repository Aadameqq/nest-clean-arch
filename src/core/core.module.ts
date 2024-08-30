import { Module } from '@nestjs/common';
import { RedirectInteractor } from './application/interactors/redirect-interactor';
import { PrismaRedirectRepository } from './infrastructure/data/prisma-redirect-repository';
import { RedirectInteractorImpl } from './application/interactors/redirect-interactor-impl';
import { UserInteractor } from './application/interactors/user-interactor';
import { PrismaUserRepository } from './infrastructure/data/prisma-user-repository';
import { UserInteractorImpl } from './application/interactors/user-interactor-impl';
import { BcryptPasswordHasher } from './infrastructure/bcrypt-password-hasher';
import { JsonwebtokenTokenManager } from './infrastructure/jsonwebtoken-token-manager';

@Module({
    providers: [
        {
            provide: RedirectInteractor,
            useFactory: (repository: PrismaRedirectRepository) => {
                return new RedirectInteractorImpl(repository);
            },
            inject: [PrismaRedirectRepository],
        },
        PrismaRedirectRepository,
        {
            provide: UserInteractor,
            useFactory: (
                repository: PrismaUserRepository,
                passwordHasher: BcryptPasswordHasher,
                tokenManager: JsonwebtokenTokenManager,
            ) => {
                return new UserInteractorImpl(
                    repository,
                    tokenManager,
                    passwordHasher,
                );
            },
            inject: [
                PrismaUserRepository,
                BcryptPasswordHasher,
                JsonwebtokenTokenManager,
            ],
        },
        PrismaUserRepository,
        BcryptPasswordHasher,
        JsonwebtokenTokenManager,
    ],
    exports: [RedirectInteractor, UserInteractor],
})
export class CoreModule {}
