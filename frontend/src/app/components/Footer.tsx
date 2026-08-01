import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { AnoriLogo } from './AnoriLogo';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <AnoriLogo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('footerDesc')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6 text-gray-900">{t('navigation')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=necklace" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {t('necklaces')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=chain" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {t('chains')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=pendant" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {t('pendants')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6 text-gray-900">{t('contacts')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+998 88 688 67 77</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0 text-yellow-700" />
                <span>{t('workingHours')}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@anori-tashkent.uz</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{t('address')}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6 text-gray-900">{t('socialMedia')}</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-yellow-700 hover:border-yellow-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-yellow-700 hover:border-yellow-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Anori Tashkent. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
