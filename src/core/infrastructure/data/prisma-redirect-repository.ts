import { Redirect as RedirectModel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { RedirectRepository } from '../../application/ports/redirect-repository';
import { PrismaService } from './prisma-service';
import { Redirect } from '../../domain/redirect';
import { RedirectId } from '../../domain/redirect-id';

@Injectable()
export class PrismaRedirectRepository implements RedirectRepository {
    public constructor(private prismaService: PrismaService) {}

    public generateIdentity(): RedirectId {
        return RedirectId.fromString(uuid());
    }

    public async getById(id: RedirectId): Promise<Redirect | false> {
        const found = await this.prismaService.redirect.findUnique({
            where: { id: id.toString() },
        });

        if (!found) return false;

        return this.convertModelToRedirect(found);
    }

    public async persist(redirect: Redirect): Promise<void> {
        const redirectModel = this.convertRedirectToModel(redirect);

        await this.prismaService.redirect.upsert({
            where: { id: redirectModel.id },
            update: redirectModel,
            create: redirectModel,
        });
    }

    public async getAllByOwnerId(ownerId: string): Promise<Redirect[]> {
        const found = await this.prismaService.redirect.findMany({
            where: { ownerId },
        });

        return found.map((single) => this.convertModelToRedirect(single));
    }

    private convertModelToRedirect(model: RedirectModel): Redirect {
        return new Redirect(
            RedirectId.fromString(model.id),
            model.url,
            model.ownerId,
            model.viewsCount,
        );
    }

    private convertRedirectToModel(redirect: Redirect): RedirectModel {
        return {
            id: redirect.id.toString(),
            url: redirect.url,
            ownerId: redirect.ownerId,
            viewsCount: redirect.viewsCount,
        };
    }
}
