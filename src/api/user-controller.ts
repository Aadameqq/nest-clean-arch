import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequest } from './dtos/create-user-request';
import { UsernameOccupied } from '../core/domain/username-occupied';
import { UserInteractor } from '../core/application/interactors/user-interactor';

@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(private userInteractor: UserInteractor) {}

    @ApiOperation({ summary: 'Creates new user' })
    @ApiCreatedResponse({ description: 'Created new Account' })
    @ApiBadRequestResponse({ description: "Given data didn't pass validation" })
    @Post('/')
    public async register(@Body() createUserRequest: CreateUserRequest) {
        try {
            await this.userInteractor.register(
                createUserRequest.username,
                createUserRequest.password,
            );
        } catch (ex) {
            if (ex instanceof UsernameOccupied) {
                throw new ConflictException();
            }
            throw ex;
        }
    }
}
