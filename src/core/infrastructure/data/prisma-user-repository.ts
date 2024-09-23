import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User as UserModel } from '@prisma/client';
import { UserId } from '../../domain/user-id';
import { PrismaService } from './prisma-service';
import { UserRepository } from '../../application/ports/user-repository';
import { User } from '../../domain/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    public constructor(private prismaService: PrismaService) {}

    public async getById(id: UserId): Promise<User | false> {
        const found = await this.prismaService.user.findUnique({
            where: {
                id: id.toString(),
            },
        });

        if (!found) return false;

        return this.convertModelToUser(found);
    }

    public generateIdentity(): UserId {
        return UserId.fromString(uuid());
    }

    public async getByUsername(username: string): Promise<User | false> {
        const found = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!found) return false;

        return this.convertModelToUser(found);
    }

    public async persist(user: User): Promise<void> {
        const userModel = this.convertUserToModel(user);

        await this.prismaService.user.upsert({
            where: { id: userModel.id },
            update: userModel,
            create: userModel,
        });
    }

    private convertModelToUser(model: UserModel): User {
        return new User(
            UserId.fromString(model.id),
            model.username,
            model.password,
            model.displayName,
            model.bio,
        );
    }

    private convertUserToModel(user: User): UserModel {
        return {
            id: user.id.toString(),
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            bio: user.bio,
        };
    }
}
