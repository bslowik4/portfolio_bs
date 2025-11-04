import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bartłomiej Słowik - Full Stack Developer',
  description:
    'Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. View my portfolio, projects, and experience.',
  keywords: [
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
    'React',
    'Web Development',
    'Portfolio',
    'Bartłomiej Słowik',
  ],
  authors: [{ name: 'Bartłomiej Słowik', url: 'https://portfolio-bs-pink.vercel.app' }],
  creator: 'Bartłomiej Słowik',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-bs-pink.vercel.app',
    title: 'Bartłomiej Słowik - Full Stack Developer',
    description:
      'Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies.',
    siteName: 'Bartłomiej Słowik Portfolio',
    images: [
      {
        url: 'https://portfolio-bs-pink.vercel.app/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Bartłomiej Słowik - Full Stack Developer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen px-4 sm:px-8 md:px-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
