import { Module } from '@nestjs/common';
import { RedirectionInteractor } from './application/interactors/redirection-interactor';
import { PrismaRedirectionRepository } from './infrastructure/data/prisma-redirection-repository';
import { RedirectionInteractorImpl } from './application/interactors/redirection-interactor-impl';
import { UserInteractor } from './application/interactors/user-interactor';
import { PrismaUserRepository } from './infrastructure/data/prisma-user-repository';
import { UserInteractorImpl } from './application/interactors/user-interactor-impl';
import { BcryptPasswordHasher } from './infrastructure/bcrypt-password-hasher';
import { JsonwebtokenTokenManager } from './infrastructure/jsonwebtoken-token-manager';
import { PrismaService } from './infrastructure/data/prisma-service';
import { EventEmitter2RedirectionUsedObservable } from './infrastructure/event-emitter-2-redirection-used-observable.service';
import { UsesCountOnRedirectionUsed } from './application/event-observers/uses-count-on-redirection-used';
import { NanoidSlugGenerator } from './infrastructure/nanoid-slug-generator';

@Module({
    providers: [
        {
            provide: UsesCountOnRedirectionUsed,
            useFactory: (
                repository: PrismaRedirectionRepository,
                observable: EventEmitter2RedirectionUsedObservable,
            ) => {
                return new UsesCountOnRedirectionUsed(repository, observable);
            },
            inject: [
                PrismaRedirectionRepository,
                EventEmitter2RedirectionUsedObservable,
            ],
        },

        {
            provide: RedirectionInteractor,
            useFactory: (
                repository: PrismaRedirectionRepository,
                observable: EventEmitter2RedirectionUsedObservable,
                slugGenerator: NanoidSlugGenerator,
            ) => {
                return new RedirectionInteractorImpl(
                    repository,
                    observable,
                    slugGenerator,
                );
            },
            inject: [
                PrismaRedirectionRepository,
                EventEmitter2RedirectionUsedObservable,
                NanoidSlugGenerator,
            ],
        },
        PrismaRedirectionRepository,
        EventEmitter2RedirectionUsedObservable,
        NanoidSlugGenerator,

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
