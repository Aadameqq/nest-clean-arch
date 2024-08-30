import { AuthGuard } from './auth-guard';

describe('AuthGuard.extractTokenFromHeader', () => {
    test.each([
        { authHeader: undefined, expected: false },
        { authHeader: null, expected: false },
        { authHeader: false, expected: false },
        { authHeader: 1, expected: false },
        { authHeader: 'test', expected: false },
        { authHeader: 'Bearer', expected: false },
        { authHeader: 'Bearer ', expected: false },
        { authHeader: 'test a', expected: false },
        { authHeader: 'Bearer token', expected: 'token' },
    ])(
        'Should return "$expected" When provided with "$authHeader"',
        ({ authHeader, expected }) => {
            const actual = AuthGuard.extractTokenFromHeader(authHeader);

            expect(actual).toBe(expected);
        },
    );
});
