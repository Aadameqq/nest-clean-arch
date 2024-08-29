import { User as PrismaUser } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AuthUserRepository } from './AuthUserRepository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from './AuthUser';

@Injectable()
export class PrismaAuthUserRepository implements AuthUserRepository {
    public constructor(private prismaService: PrismaService) {}

    generateIdentity(): string {
        return uuid();
    }

    async findByUsername(username: string): Promise<AuthUser | false> {
        const found = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!found) return false;

        return new AuthUser(found.id, found.username, found.password);
    }

    async persist(user: AuthUser): Promise<void> {
        const userModel = {
            id: user.id,
            username: user.username,
            password: user.password,
            displayName: '',
            bio: '', // TODO:
        };

        await this.prismaService.user.upsert({
            where: { id: userModel.id },
            update: userModel,
            create: userModel,
        });
    }
}
