import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { LanguageProvider } from '../context/LanguageContext';
import { CurrencyProvider } from '../context/CurrencyContext';
import { PaymentSettingsProvider } from '../context/PaymentSettingsContext';
import { ProductProvider } from '../context/ProductContext';
import { ThemeProvider } from '../context/ThemeContext';

import HeaderNotificationBar from '../components/layout/HeaderNotificationBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import ToastNotification from '../components/common/ToastNotification';

export const metadata = {
  metadataBase: new URL('https://sajjadcenter.com'),
  title: {
    default: 'SajjadCenter | Luxury Fashion & Clothing Store',
    template: '%s | SajjadCenter'
  },
  description: 'SajjadCenter - Premier fashion store for luxury unstitched lawn, ready-to-wear kurtas, men waistcoats, kids eastern wear, and festive clothing.',
  keywords: [
    'SajjadCenter',
    'SajjadCenter Garh More',
    'Sajjad Center Garh More',
    'Garh More Clothing Store',
    'Garh More Cloth Shop',
    'sajjadcenter.com',
    'Pakistani Fashion',
    'Unstitched Lawn 2026',
    'Men Kurta Garh More',
    'Waistcoats'
  ],
  authors: [{ name: 'SajjadCenter Team' }],
  creator: 'SajjadCenter',
  publisher: 'SajjadCenter',
  alternates: {
    canonical: 'https://sajjadcenter.com'
  },
  openGraph: {
    title: 'SajjadCenter | Luxury Fashion & Clothing Store',
    description: 'Shop luxury unstitched lawn, designer kurtas, waistcoats, and festive wear at SajjadCenter.',
    url: 'https://sajjadcenter.com',
    siteName: 'SajjadCenter',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
        width: 1200,
        height: 630,
        alt: 'SajjadCenter Luxury Fashion Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SajjadCenter | Luxury Fashion Store',
    description: 'Shop luxury unstitched lawn, designer kurtas, and waistcoats at SajjadCenter.',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'SajjadCenter',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
    '@id': 'https://sajjadcenter.com',
    url: 'https://sajjadcenter.com',
    telephone: '+923001234567',
    priceRange: 'PKR 1000 - 20000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Bazaar, Commercial Plaza, Garh More',
      addressLocality: 'Garh More',
      addressRegion: 'Punjab',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.8431,
      longitude: 71.9015
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00'
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <LanguageProvider>
                <CurrencyProvider>
                  <PaymentSettingsProvider>
                    <CartProvider>
                      <WishlistProvider>
                        <div className="flex flex-col min-h-screen">
                          <HeaderNotificationBar />
                          <Navbar />
                          <main className="flex-grow">{children}</main>
                          <Footer />
                          <WhatsAppButton />
                          <MobileBottomNav />
                          <ToastNotification />
                        </div>
                      </WishlistProvider>
                    </CartProvider>
                  </PaymentSettingsProvider>
                </CurrencyProvider>
              </LanguageProvider>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
