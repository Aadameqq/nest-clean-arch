import { createUrl, trimSlashes } from './create-url';

describe('trimSlashes', () => {
    test.each<{ input: string; expected: string }>([
        { input: 'test', expected: 'test' },
        { input: '/test', expected: 'test' },
        { input: '/test/', expected: 'test' },
        { input: 't', expected: 't' },
        { input: '', expected: '' },
        { input: '/', expected: '' },
        { input: '//', expected: '' },
    ])(
        'Should return "$expected" When provided with "$input"',
        ({ input, expected }) => {
            const actual = trimSlashes(input);

            expect(actual).toBe(expected);
        },
    );

    test.each([undefined, 1, false])(
        'Should throw error When provided with "%0"',
        (input) => {
            const actual = () => trimSlashes(input as unknown as string);

            expect(actual).toThrow();
        },
    );
});
describe('createUrl', () => {
    test.each<{ base: string; paths: string[]; expected: string }>([
        {
            base: 'http://localhost:3000/',
            paths: ['/test/', '/test2/'],
            expected: 'http://localhost:3000/test/test2',
        },
        {
            base: 'http://localhost:3000/',
            paths: ['test', 'test2'],
            expected: 'http://localhost:3000/test/test2',
        },
        {
            base: 'http://localhost:3000',
            paths: ['test', 'test2'],
            expected: 'http://localhost:3000/test/test2',
        },
        {
            base: 'http://localhost:3000',
            paths: ['test', '/test2'],
            expected: 'http://localhost:3000/test/test2',
        },
        {
            base: 'http://localhost:3000',
            paths: ['test/', '/test2'],
            expected: 'http://localhost:3000/test/test2',
        },
    ])(
        `Should return "$expected" When provided with base="$base" and paths="$paths"`,
        ({ base, paths, expected }) => {
            const actual = createUrl(base, ...paths);

            expect(actual).toBe(expected);
        },
    );

    test.each([
        {
            base: undefined,
            paths: ['/test/', '/test2/'],
        },
        {
            base: 1,
            paths: ['test', 'test2'],
        },
        {
            base: false,
            paths: ['test', 'test2'],
        },
        {
            base: 'http://localhost:3000',
            paths: ['test', undefined],
        },
        {
            base: 'http://localhost:3000',
            paths: [1, '/test2'],
        },
        {
            base: 'http://localhost:3000',
            paths: [1, false],
        },
        {
            base: undefined,
            paths: [1, false],
        },
    ])(
        'Should throw error When provided with base="$base" and paths="$paths"',
        ({ base, paths }) => {
            const actual = () =>
                createUrl(
                    base as unknown as string,
                    ...(paths as unknown as string[]),
                );

            expect(actual).toThrow();
        },
    );
});
