import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './AuthGuard';

export const UseAuth = () => UseGuards(AuthGuard);
