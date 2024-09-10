import { webConfig } from '../../web-config';
import { createUrl } from '../create-url';

export const generateShortenedUrl = (slug: string) => {
    return createUrl(webConfig.DOMAIN, webConfig.SHORTENED_LINK_ROUTE, slug);
};
