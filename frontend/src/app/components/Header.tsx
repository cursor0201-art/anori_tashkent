import { Link } from 'react-router';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export function Header() {
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl tracking-[0.3em] font-light text-gray-900">
              ANORI<span className="text-yellow-700">_</span>TASHKENT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase">
              {t('home')}
            </Link>
            <Link to="/catalog" className="text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase">
              {t('catalog')}
            </Link>
            <Link to="/catalog?category=necklace" className="text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase">
              {t('necklaces')}
            </Link>
            <Link to="/catalog?category=chain" className="text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase">
              {t('chains')}
            </Link>
            <Link to="/catalog?category=pendant" className="text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase">
              {t('pendants')}
            </Link>
          </nav>

          {/* Right Section: Language Switcher & Cart */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50 text-xs font-medium">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  language === 'ru'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  language === 'uz'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                UZ
              </button>
            </div>

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 space-y-4 border-t border-gray-100">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
            >
              {t('home')}
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
            >
              {t('catalog')}
            </Link>
            <Link
              to="/catalog?category=necklace"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
            >
              {t('necklaces')}
            </Link>
            <Link
              to="/catalog?category=chain"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
            >
              {t('chains')}
            </Link>
            <Link
              to="/catalog?category=pendant"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
            >
              {t('pendants')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
