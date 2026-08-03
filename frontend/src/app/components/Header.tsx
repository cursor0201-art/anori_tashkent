import { Link } from 'react-router';
import { ShoppingBag, Menu, X, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { AnoriLogo } from './AnoriLogo';
import { useState, useEffect } from 'react';
import api from '../services/api';

export function Header() {
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const [categories, setCategories] = useState<{ id: number; name: string; name_uz: string; slug: string }[]>([]);

  useEffect(() => {
    api.get('catalog/categories/')
      .then(res => {
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data.results || []);
          setCategories(list);
        }
      })
      .catch(err => console.error('Failed to load categories for header:', err));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 pt-[env(safe-area-inset-top,0px)]">
      {/* Top Working Hours Bar (Hidden on Smartwatches < 360px) */}
      <div className="bg-gray-900 text-gray-300 py-1.5 px-4 text-xs hidden xs:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>{t('workingHours')}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 font-mono">
            <a href="tel:+998886886777" className="hover:text-white transition-colors">+998 88 688 67 77</a>
            <span>|</span>
            <a href="tel:+998977481990" className="hover:text-white transition-colors">+998 97 748 19 90</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center min-h-[44px] py-1">
            <AnoriLogo className="h-9 sm:h-11 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation (>= 1024px, Dynamic from DB) */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <Link to="/" className="text-sm tracking-wider text-gray-700 hover:text-[#C8102E] transition-colors uppercase font-medium">
              {t('home')}
            </Link>
            <Link to="/catalog" className="text-sm tracking-wider text-gray-700 hover:text-[#C8102E] transition-colors uppercase font-medium">
              {t('catalog')}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog?category=${cat.slug}`}
                className="text-sm tracking-wider text-gray-700 hover:text-[#C8102E] transition-colors uppercase font-medium"
              >
                {language === 'uz' ? (cat.name_uz || cat.name) : cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Language & Cart & Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Switcher (Compact on small mobile) */}
            <div className="flex items-center border border-gray-200 rounded-full p-0.5 bg-gray-50 text-xs font-medium">
              <button
                onClick={() => setLanguage('ru')}
                className={`min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] px-2 rounded-full transition-all duration-200 ${
                  language === 'ru'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Переключить на Русский"
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('uz')}
                className={`min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] px-2 rounded-full transition-all duration-200 ${
                  language === 'uz'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="O'zbek tiliga o'tkazish"
              >
                UZ
              </button>
            </div>

            {/* Shopping Cart Icon (Touch target 44x44px) */}
            <Link
              to="/cart"
              className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 hover:text-[#C8102E] transition-colors"
              aria-label="Корзина"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#C8102E] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button (< 1024px, Touch target 44x44px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-gray-700 hover:text-[#C8102E] transition-colors"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Fullscreen Overlay & Sliding Panel (< 1024px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden flex">
          {/* Dark Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Full Height Right Drawer Panel */}
          <div className="relative ml-auto w-[85%] max-w-xs sm:max-w-sm bg-white h-[100vh] min-h-[100dvh] shadow-2xl flex flex-col z-[1000] overflow-y-auto pt-6 pb-8 px-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <AnoriLogo className="h-10 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
                aria-label="Закрыть меню"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-6 flex-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base tracking-wider text-gray-900 hover:text-[#C8102E] font-medium uppercase py-2"
              >
                {t('home')}
              </Link>
              <Link
                to="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base tracking-wider text-gray-900 hover:text-[#C8102E] font-medium uppercase py-2"
              >
                {t('catalog')}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalog?category=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base tracking-wider text-gray-900 hover:text-[#C8102E] font-medium uppercase py-2"
                >
                  {language === 'uz' ? (cat.name_uz || cat.name) : cat.name}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 pt-6 mt-auto">
              <p className="text-xs text-gray-500 mb-2">{t('workingHours')}</p>
              <div className="space-y-1">
                <a href="tel:+998886886777" className="block text-sm font-semibold text-gray-900 hover:text-[#C8102E] transition-colors">+998 88 688 67 77</a>
                <a href="tel:+998977481990" className="block text-sm font-semibold text-gray-900 hover:text-[#C8102E] transition-colors">+998 97 748 19 90</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
