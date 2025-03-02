'use client';

import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Web3Provider } from '@/components/providers/web3-provider';
import { AudioProvider } from '@/components/providers/audio-provider';
import { BadgeProvider } from '@/components/providers/badge-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/layout/main-nav';
import ErrorBoundary from '@/components/shared/error-boundary';
import { ServiceWorker } from '@/components/shared/service-worker';
import { BackgroundPattern } from '@/components/shared/background-pattern';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const AudioPlayer = dynamic(
  () =>
    import('@/components/player/audio-player').then((mod) => mod.AudioPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t animate-pulse" />
    ),
  }
);

// Removed metadata export

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="application-name" content="Afrobeats NFT" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Afrobeats NFT" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Web3Provider>
            <AudioProvider>
              <BadgeProvider>
                <ErrorBoundary>
                  <div className="min-h-screen flex flex-col relative bg-background">
                    <BackgroundPattern />
                    <MainNav />
                    <main className="flex-1 relative z-[1]">{children}</main>
                    <AudioPlayer />
                  </div>
                  <Toaster />
                  <ServiceWorker />
                </ErrorBoundary>
              </BadgeProvider>
            </AudioProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
