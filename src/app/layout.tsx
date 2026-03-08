import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { NavigationTracker } from '@/components/NavigationTracker';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { RivodeskAnalytics } from '@/components/RivodeskAnalytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'My Store',
    template: '%s | My Store',
  },
  description: 'Welcome to our store.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <body>
        <CartProvider>
          <RivodeskAnalytics />
          <NavigationTracker />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
