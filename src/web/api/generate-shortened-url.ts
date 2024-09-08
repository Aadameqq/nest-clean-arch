import { webEnv } from '../../web-env';

export const generateShortenedUrl = (slug: string) => {
    return `${webEnv.DOMAIN}/${webEnv.SHORTENED_LINK_ROUTE}/${slug}`;
};
