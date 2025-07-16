import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" aria-label="AI Tools Directory">
      <Head>
        {/* Schema.org Organization Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'AI Tools Directory',
          'url': 'https://yourdomain.com',
          'logo': 'https://yourdomain.com/logo-placeholder.png',
          'sameAs': [
            'https://twitter.com/',
            'https://linkedin.com/',
            'https://youtube.com/',
            'https://instagram.com/'
          ]
        }) }} />
        {/* Breadcrumbs example */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yourdomain.com/' },
            { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://yourdomain.com/ai-tools' }
          ]
        }) }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 