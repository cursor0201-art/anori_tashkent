import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { AnoriLogo } from './AnoriLogo';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16 sm:mt-24 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4 sm:mb-6 min-h-[44px]">
              <AnoriLogo className="h-9 sm:h-10 w-auto" />
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
              {t('footerDesc')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6 font-semibold text-gray-900">{t('navigation')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-xs sm:text-sm text-gray-600 hover:text-[#C8102E] transition-colors inline-block py-1">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-xs sm:text-sm text-gray-600 hover:text-[#C8102E] transition-colors inline-block py-1">
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=necklace" className="text-xs sm:text-sm text-gray-600 hover:text-[#C8102E] transition-colors inline-block py-1">
                  {t('necklaces')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=chain" className="text-xs sm:text-sm text-gray-600 hover:text-[#C8102E] transition-colors inline-block py-1">
                  {t('chains')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=pendant" className="text-xs sm:text-sm text-gray-600 hover:text-[#C8102E] transition-colors inline-block py-1">
                  {t('pendants')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6 font-semibold text-gray-900">{t('contacts')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-xs sm:text-sm text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:+998886886777" className="hover:text-gray-900 transition-colors">+998 88 688 67 77</a>
                  <a href="tel:+998977481990" className="hover:text-gray-900 transition-colors">+998 97 748 19 90</a>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0 text-[#C8102E]" />
                <span>{t('workingHours')}</span>
              </li>
              <li className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <span>info@anori-tashkent.uz</span>
              </li>
              <li className="flex items-start space-x-3 text-xs sm:text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <span>{t('address')}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6 font-semibold text-gray-900">{t('socialMedia')}</h4>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/anori.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 sm:mt-12 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 Anori Tashkent. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
