import { webConfig } from '../../web-config';

export const generateShortenedUrl = (slug: string) => {
    return `${webConfig.DOMAIN}/${webConfig.SHORTENED_LINK_ROUTE}/${slug}`;
};
