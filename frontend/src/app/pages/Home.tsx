import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Truck, Shield, Gift, Star, Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { TelegramButton } from '../components/TelegramButton';
import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export function Home() {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch featured products (is_new = true)
        const productsRes = await api.get('catalog/products/', { params: { is_new: true } });
        const mappedProducts = productsRes.data.results.map((p: any) => ({
          id: p.id.toString(),
          name: p.name,
          price: parseFloat(p.price),
          category: (p.category_slug || '').toLowerCase(),
          image: p.image || '',
          images: p.image ? [p.image] : [],
          description: '',
          featured: p.is_new
        }));
        setFeaturedProducts(mappedProducts.slice(0, 3));

        // Fetch categories
        const categoriesRes = await api.get('catalog/categories/');
        setCategories(categoriesRes.data.results);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SEO title={t('home')} />
      {/* Hero Section (Adaptive Single-column on mobile < 640px, flex/grid on >= 640px) */}
      <section className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden py-12 sm:py-20 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80"
            alt="Silver jewelry background"
            className="w-full h-full object-cover opacity-30 filter grayscale brightness-110 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4 sm:mb-6 font-light leading-tight">
              {t('heroTitle1')}<span className="text-[#C8102E] font-normal block sm:inline">{t('heroTitle2')}</span>{t('heroTitle3')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-lg font-light">
              {t('heroSubtitle')}
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center space-x-3 bg-[#C8102E] hover:bg-black border border-[#C8102E] text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-900/30 w-full sm:w-auto min-h-[44px]"
            >
              <span className="tracking-wider uppercase text-xs sm:text-sm font-medium">{t('viewCollection')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products (2 cols on mobile 320-639px, 3 on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl tracking-tight mb-3 sm:mb-4">{t('popularJewelry')}</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {t('popularSubtitle')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#C8102E]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 text-gray-900 hover:text-yellow-700 transition-colors"
          >
            <span className="tracking-wider uppercase text-sm">{t('viewAllCollection')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Categories (Dynamic from Django Backend) */}
      {categories.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl tracking-tight mb-3 sm:mb-4">{t('categories')}</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">{t('categoriesSubtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalog?category=${cat.slug}`}
                  className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={cat.image_url || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                    <div className="p-6 sm:p-8 text-white w-full">
                      <h3 className="text-2xl sm:text-3xl tracking-wide mb-2 font-normal">{cat.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">{t('goToCategory')} &rarr;</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Infinite Ticker Marquee Banner */}
      <section className="bg-gray-900 text-white py-6 overflow-hidden border-y border-gray-800">
        <div className="animate-marquee whitespace-nowrap text-lg sm:text-xl font-light tracking-widest flex items-center space-x-12 uppercase">
          <span className="flex items-center space-x-12">
            <span>• {t('freeDelivery')}</span>
            <span>• {t('qualityGuarantee')}</span>
            <span>• {t('popularJewelry')}</span>
            <span>• {t('luxuryPackaging')}</span>
            <span>• Silver Jewelry Tashkent</span>
            <span>• 925 Sterling Silver</span>
          </span>
          <span className="flex items-center space-x-12">
            <span>• {t('freeDelivery')}</span>
            <span>• {t('qualityGuarantee')}</span>
            <span>• {t('popularJewelry')}</span>
            <span>• {t('luxuryPackaging')}</span>
            <span>• Silver Jewelry Tashkent</span>
            <span>• 925 Sterling Silver</span>
          </span>
          <span className="flex items-center space-x-12">
            <span>• {t('freeDelivery')}</span>
            <span>• {t('qualityGuarantee')}</span>
            <span>• {t('popularJewelry')}</span>
            <span>• {t('luxuryPackaging')}</span>
            <span>• Silver Jewelry Tashkent</span>
            <span>• 925 Sterling Silver</span>
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#C8102E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8 text-[#C8102E]" />
            </div>
            <h3 className="text-xl mb-3">{t('freeDelivery')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('freeDeliveryDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#C8102E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#C8102E]" />
            </div>
            <h3 className="text-xl mb-3">{t('qualityGuarantee')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('qualityGuaranteeDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#C8102E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-[#C8102E]" />
            </div>
            <h3 className="text-xl mb-3">{t('luxuryPackaging')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('luxuryPackagingDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl tracking-tight mb-4">{t('reviews')}</h2>
            <p className="text-gray-600">{t('reviewsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-700 text-yellow-700" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('review1')}
              </p>
              <p className="text-sm">— Alina K.</p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-700 text-yellow-700" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('review2')}
              </p>
              <p className="text-sm">— Marina D.</p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-700 text-yellow-700" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('review3')}
              </p>
              <p className="text-sm">— Diana S.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl tracking-tight mb-4">@anori_tashkent</h2>
          <p className="text-gray-600 mb-6">{t('followInstagram')}</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-gray-900 hover:text-yellow-700 transition-colors"
          >
            <span className="tracking-wider uppercase text-sm">{t('subscribe')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"
              alt="Instagram post"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80"
              alt="Instagram post"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80"
              alt="Instagram post"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80"
              alt="Instagram post"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl mb-6 font-light">{t('seoTitle')}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('seoText1')}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t('seoText2')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
