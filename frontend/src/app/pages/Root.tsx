import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import { LanguageProvider } from '../context/LanguageContext';

export function Root() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
