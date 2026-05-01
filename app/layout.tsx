import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Alcohol Screening Tool - Confidential Assessment',
  description: 'A confidential alcohol screening questionnaire that provides personalized feedback and resources based on the AUDIT assessment.',
  keywords: ['alcohol screening', 'AUDIT questionnaire', 'alcohol assessment', 'addiction screening'],
  robots: 'noindex, nofollow', // Privacy consideration
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}