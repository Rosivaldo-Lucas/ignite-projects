import { getCssText } from '@/styles/stitches.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop App',
  description: 'App Shop',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}
