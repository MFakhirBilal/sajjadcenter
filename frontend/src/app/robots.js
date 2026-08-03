export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/adminfakhir/', '/api/']
    },
    sitemap: 'https://sajjadcenter.com/sitemap.xml'
  };
}

