import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script, { type ScriptProps } from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.roamin10.com'),
  title: 'Roamin10 — Mediterranean Travel Guide & App',
  description: 'Discover Roamin10, the European travel app with city guides and premium planning features, plus 10 Minute Spain, free for now. Explore better with less searching.',
  alternates: { canonical: 'https://www.roamin10.com/' },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFBF7' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="travelpayouts-drive-bootstrap"
          strategy="beforeInteractive"
          {...({
            nowprocket: '',
            'data-noptimize': '1',
            'data-cfasync': 'false',
            'data-wpfc-render': 'false',
            'seraph-accel-crit': '1',
            'data-no-defer': '1',
            'data-cmp-ab': '2',
          } as ScriptProps)}
          dangerouslySetInnerHTML={{
            __html: `(function () {
              if (document.getElementById('travelpayouts-drive')) return;
              var script = document.createElement('script');
              script.id = 'travelpayouts-drive';
              script.async = 1;
              script.setAttribute('data-cmp-ab', '2');
              script.src = 'https://tpembars.com/NjA2ODMz.js?t=606833';
              document.head.appendChild(script);
            })();`,
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
