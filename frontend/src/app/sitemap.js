import { sampleProducts } from '../data/sampleProducts';

export default async function sitemap() {
  const baseUrl = 'https://sajjadcenter.com';

  const productUrls = sampleProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const staticUrls = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/track-order',
    '/privacy-policy',
    '/terms',
    '/shipping-policy',
    '/return-policy'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.9
  }));

  return [...staticUrls, ...productUrls];
}
