import { Module } from '@nestjs/common';
import { RedirectInteractor } from './application/interactors/redirect-interactor';
import { PrismaRedirectRepository } from './infrastructure/prisma-redirect-repository';
import { RedirectInteractorImpl } from './application/interactors/redirect-interactor-impl';

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
    ],
    exports: [RedirectInteractor],
})
export class CoreModule {}
