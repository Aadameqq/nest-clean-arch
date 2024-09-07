import { Redirection as RedirectionModel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { RedirectionRepository } from '../../application/ports/redirection-repository';
import { PrismaService } from './prisma-service';
import { Redirection } from '../../domain/redirection';
import { RedirectionId } from '../../domain/redirection-id';

@Injectable()
export class PrismaRedirectionRepository implements RedirectionRepository {
    public constructor(private prismaService: PrismaService) {}

    public generateIdentity(): RedirectionId {
        return RedirectionId.fromString(uuid());
    }

    public async getById(id: RedirectionId): Promise<Redirection | false> {
        const found = await this.prismaService.redirection.findUnique({
            where: { id: id.toString() },
        });

        if (!found) return false;

        return this.convertModelToRedirection(found);
    }

    public async getBySlug(slug: string): Promise<Redirection | false> {
        const found = await this.prismaService.redirection.findUnique({
            where: { slug },
        });

        if (!found) return false;

        return this.convertModelToRedirection(found);
    }

    public async persist(redirection: Redirection): Promise<void> {
        const redirectionModel = this.convertRedirectionToModel(redirection);

        await this.prismaService.redirection.upsert({
            where: { id: redirectionModel.id },
            update: redirectionModel,
            create: redirectionModel,
        });
    }

    public async remove(redirect: Redirection) {
        await this.prismaService.redirection.delete({
            where: { id: redirect.id.toString() },
        });
    }

    public async getAllByOwnerId(ownerId: string): Promise<Redirection[]> {
        const found = await this.prismaService.redirection.findMany({
            where: { ownerId },
        });

        return found.map((single) => this.convertModelToRedirection(single));
    }

    private convertModelToRedirection(model: RedirectionModel): Redirection {
        return new Redirection(
            RedirectionId.fromString(model.id),
            model.url,
            model.ownerId,
            model.slug,
            model.usesCount,
        );
    }

    private convertRedirectionToModel(
        redirection: Redirection,
    ): RedirectionModel {
        return {
            id: redirection.id.toString(),
            url: redirection.url,
            ownerId: redirection.ownerId,
            slug: redirection.slug,
            usesCount: redirection.usesCount,
        };
    }
}
