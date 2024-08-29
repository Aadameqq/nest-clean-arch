import { Module } from '@nestjs/common';
import { RedirectService } from './RedirectService';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaRedirectRepository } from './PrismaRedirectRepository';
import { RedirectIdGenerator } from './RedirectIdGenerator';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: RedirectService,
            useFactory: (redirectRepository: PrismaRedirectRepository) => {
                return new RedirectService(redirectRepository);
            },
            inject: [PrismaRedirectRepository],
        },
        PrismaRedirectRepository,
        {
            provide: RedirectIdGenerator,
            useFactory: (redirectRepository: PrismaRedirectRepository) => {
                return new RedirectIdGenerator(redirectRepository);
            },
            inject: [PrismaRedirectRepository],
        },
    ],
    exports: [RedirectService, RedirectIdGenerator],
})
export class RedirectModule {}
