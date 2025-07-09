import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; //Using Inter as per general instructions
import ApolloWrapper from '@/components/ApolloWrapper'; //Import the new client ApolloWrapper component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'V-Connect Profile App',
  description: 'Profile page with editable sections and portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        Using Inter font as per initial instructions.
        If you wish to use Geist, change `inter.className` to
        `${geistSans.variable} ${geistMono.variable} antialiased`
        and uncomment the Geist font imports above.
      */}
      <body className={inter.className}>
        {/* Wrap your entire application with the imported ApolloWrapper */}
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
