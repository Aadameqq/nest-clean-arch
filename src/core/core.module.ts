import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedirectInteractor } from './application/interactors/redirect-interactor';
import { PrismaRedirectRepository } from './infrastructure/data/prisma-redirect-repository';
import { RedirectInteractorImpl } from './application/interactors/redirect-interactor-impl';
import { UserInteractor } from './application/interactors/user-interactor';
import { PrismaUserRepository } from './infrastructure/data/prisma-user-repository';
import { UserInteractorImpl } from './application/interactors/user-interactor-impl';
import { BcryptPasswordHasher } from './infrastructure/bcrypt-password-hasher';
import { JsonwebtokenTokenManager } from './infrastructure/jsonwebtoken-token-manager';
import { PrismaService } from './infrastructure/data/prisma-service';
import { NestRedirectViewedObservable } from './infrastructure/nest-redirect-viewed-observable';
import { ViewsCountOnRedirectViewed } from './application/event-observers/views-count-on-redirect-viewed';

@Module({
    imports: [EventEmitterModule.forRoot()], // TODO:
    providers: [
        {
            provide: ViewsCountOnRedirectViewed,
            useFactory: (
                repository: PrismaRedirectRepository,
                observable: NestRedirectViewedObservable,
            ) => {
                return new ViewsCountOnRedirectViewed(repository, observable);
            },
            inject: [PrismaRedirectRepository, NestRedirectViewedObservable],
        },

        {
            provide: RedirectInteractor,
            useFactory: (
                repository: PrismaRedirectRepository,
                observable: NestRedirectViewedObservable,
            ) => {
                return new RedirectInteractorImpl(repository, observable);
            },
            inject: [PrismaRedirectRepository, NestRedirectViewedObservable],
        },
        PrismaRedirectRepository,
        NestRedirectViewedObservable,

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
    exports: [RedirectInteractor, UserInteractor],
})
export class CoreModule {}
