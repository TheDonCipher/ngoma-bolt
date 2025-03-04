console.log('RootLayout: Start');
import './globals.css';
import '@/styles/patterns.css';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';
import { MainNavWrapper } from '@/components/layout/main-nav-wrapper';

// If you don't have a theme-provider component, either create it or remove this import
// import { ThemeProvider } from '@/components/theme-provider';

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

export const metadata: Metadata = {
  title: 'Ngoma',
  description: 'Music Platform for African Artists',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        {/* If you don't have ThemeProvider, remove this wrapper */}
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <Providers>
          <MainNavWrapper />
          {children}
        </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
