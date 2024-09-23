export function trimSlashes(str: string) {
    if (typeof str !== 'string') {
        throw new Error('Argument of trimSlashes must be a string');
    }

    let trimmed = str;
    if (trimmed[0] === '/') {
        trimmed = trimmed.slice(1);
    }
    if (trimmed[trimmed.length - 1] === '/') {
        trimmed = trimmed.slice(0, -1);
    }
    return trimmed;
}

export function createUrl(base: string, ...paths: string[]) {
    if (typeof base !== 'string') {
        throw new Error('Argument "base" of createUrl must be a string');
    }

    return paths.reduce((acc, curr) => {
        if (typeof curr !== 'string') {
            throw new Error(
                'Argument "paths" of createUrl must be an array of strings',
            );
        }

        return `${acc}/${trimSlashes(curr)}`;
    }, trimSlashes(base));
}
