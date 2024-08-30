import { Redirect as PrismaRedirect } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { RedirectRepository } from '../application/ports/redirect-repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Redirect } from '../domain/redirect';
import { RedirectId } from '../domain/redirect-id';

@Injectable()
export class PrismaRedirectRepository implements RedirectRepository {
    public constructor(private prismaService: PrismaService) {}

    generateIdentity(): RedirectId {
        return RedirectId.fromString(uuid());
    }

    async getById(id: RedirectId): Promise<Redirect | false> {
        const found = await this.prismaService.redirect.findUnique({
            where: { id: id.toString() },
        });

        if (!found) return false;

        return new Redirect(
            RedirectId.fromString(found.id),
            found.url,
            found.ownerId,
            found.usesAmount,
        );
    }

    async persist(redirect: Redirect): Promise<void> {
        const redirectModel: PrismaRedirect = {
            id: redirect.id.toString(),
            url: redirect.url,
            ownerId: redirect.ownerId,
            usesAmount: redirect.useCount,
        };

        await this.prismaService.redirect.upsert({
            where: { id: redirectModel.id },
            update: redirectModel,
            create: redirectModel,
        });
    }

    async getAllByOwnerId(ownerId: string): Promise<Redirect[]> {
        const found = await this.prismaService.redirect.findMany({
            where: { ownerId },
        });

        return found.map(
            (single) =>
                new Redirect(
                    RedirectId.fromString(single.id),
                    single.url,
                    single.ownerId,
                    single.usesAmount,
                ),
        );
    }
}
