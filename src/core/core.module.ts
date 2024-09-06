import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedirectionInteractor } from './application/interactors/redirection-interactor';
import { PrismaRedirectionRepository } from './infrastructure/data/prisma-redirection-repository';
import { RedirectionInteractorImpl } from './application/interactors/redirection-interactor-impl';
import { UserInteractor } from './application/interactors/user-interactor';
import { PrismaUserRepository } from './infrastructure/data/prisma-user-repository';
import { UserInteractorImpl } from './application/interactors/user-interactor-impl';
import { BcryptPasswordHasher } from './infrastructure/bcrypt-password-hasher';
import { JsonwebtokenTokenManager } from './infrastructure/jsonwebtoken-token-manager';
import { PrismaService } from './infrastructure/data/prisma-service';
import { NestRedirectionUsedObservable } from './infrastructure/nest-redirection-used-observable.service';
import { UsesCountOnRedirectionUsed } from './application/event-observers/uses-count-on-redirection-used';

@Module({
    imports: [EventEmitterModule.forRoot()], // TODO:
    providers: [
        {
            provide: UsesCountOnRedirectionUsed,
            useFactory: (
                repository: PrismaRedirectionRepository,
                observable: NestRedirectionUsedObservable,
            ) => {
                return new UsesCountOnRedirectionUsed(repository, observable);
            },
            inject: [
                PrismaRedirectionRepository,
                NestRedirectionUsedObservable,
            ],
        },

        {
            provide: RedirectionInteractor,
            useFactory: (
                repository: PrismaRedirectionRepository,
                observable: NestRedirectionUsedObservable,
            ) => {
                return new RedirectionInteractorImpl(repository, observable);
            },
            inject: [
                PrismaRedirectionRepository,
                NestRedirectionUsedObservable,
            ],
        },
        PrismaRedirectionRepository,
        NestRedirectionUsedObservable,

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

        PrismaService,
    ],
    exports: [RedirectionInteractor, UserInteractor],
})
export class CoreModule {}
