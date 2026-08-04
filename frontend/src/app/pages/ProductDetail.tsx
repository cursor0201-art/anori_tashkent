import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Truck, RotateCcw, Shield, Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { TelegramButton } from '../components/TelegramButton';
import { SEO } from '../components/SEO';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`catalog/products/${id}/`);
        const p = response.data;
        const mappedProduct: Product = {
          id: p.id.toString(),
          name: p.name,
          name_uz: p.name_uz,
          price: parseFloat(p.price),
          category: (p.category_name || '').toLowerCase(),
          image: p.images && p.images[0] ? p.images[0].image_url : '',
          images: p.images ? p.images.map((img: any) => img.image_url) : [],
          description: p.description,
          description_uz: p.description_uz,
          characteristics: p.characteristics || {},
          characteristics_uz: p.characteristics_uz || {},
          featured: p.is_new
        };
        setProduct(mappedProduct);

        const relatedRes = await api.get(`catalog/products/`, {
          params: { category__slug: p.category_slug || p.category }
        });
        const mappedRelated = relatedRes.data.results
          .filter((item: any) => item.id !== p.id)
          .map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            price: parseFloat(item.price),
            category: (item.category_slug || '').toLowerCase(),
            image: item.image || '',
            images: item.image ? [item.image] : [],
            description: '',
          }));
        setRelatedProducts(mappedRelated);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Товар не найден');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8102E]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl mb-4">{error || 'Товар не найден'}</h2>
        <Link to="/catalog" className="text-[#C8102E] hover:underline">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 md:py-20 pb-28 lg:pb-20">
      <SEO
        title={product.name}
        description={product.description || "Изысканное украшение от Anori Tashkent"}
        image={product.image}
        url={`${window.location.origin}/product/${product.id}`}
        type="product"
      />
      {/* Breadcrumbs */}
      <Link
        to="/catalog"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Назад к каталогу</span>
      </Link>

      {/* Main product area: Single column on mobile (< 1024px), Two-column on Desktop (>= 1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all min-h-[44px] ${selectedImage === index ? 'border-[#C8102E]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-4xl tracking-tight mb-3 font-normal">
                {language === 'uz' ? (product.name_uz || product.name) : product.name}
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.price.toLocaleString('ru-RU')} <span className="text-sm font-normal text-gray-500">{language === 'uz' ? "so'm" : "сум"}</span>
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {language === 'uz' ? (product.description_uz || product.description) : product.description}
              </p>
            </div>

            {/* Product Characteristics Block */}
            {(() => {
              const activeChar = language === 'uz' && product.characteristics_uz && product.characteristics_uz !== ''
                ? product.characteristics_uz
                : product.characteristics;
              
              if (!activeChar) return null;

              // If it's a simple string (plain text)
              if (typeof activeChar === 'string') {
                const lines = activeChar.split('\n').map(l => l.trim()).filter(Boolean);
                if (lines.length === 0) return null;

                return (
                  <div className="mb-8 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                      {language === 'uz' ? 'Xususiyatlari' : 'Характеристики'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      {lines.map((line, idx) => {
                        const parts = line.split(/:(.+)/);
                        if (parts.length >= 2) {
                          return (
                            <div key={idx} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/50 pb-1.5">
                              <span className="text-gray-500 font-normal">{parts[0].trim()}:</span>
                              <span className="text-gray-900 font-medium sm:text-right">{parts[1].trim()}</span>
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className="text-gray-800 border-b border-gray-200/50 pb-1.5">
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // If it's an object (JSON)
              if (typeof activeChar === 'object' && Object.keys(activeChar).length > 0) {
                return (
                  <div className="mb-8 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                      {language === 'uz' ? 'Xususiyatlari' : 'Характеристики'}
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      {Object.entries(activeChar).map(([key, val]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/50 pb-1.5">
                          <dt className="text-gray-500 font-normal">{key}:</dt>
                          <dd className="text-gray-900 font-medium sm:text-right">{String(val)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              }

              return null;
            })()}

            {/* Desktop Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full min-h-[48px] bg-gray-900 text-white font-medium py-3.5 px-6 rounded-full hover:bg-[#C8102E] transition-colors duration-300 shadow-sm"
              >
                {addedToCart ? 'Добавлено в корзину!' : 'Добавить в корзину'}
              </button>

              <button
                onClick={() => {
                  addItem(product);
                  navigate('/checkout');
                }}
                className="w-full min-h-[48px] border-2 border-gray-900 text-gray-900 font-medium py-3.5 px-6 rounded-full hover:bg-gray-50 transition-colors duration-300"
              >
                Купить сейчас
              </button>

              <div className="pt-2">
                <TelegramButton product={product} variant="primary" className="w-full min-h-[48px]" />
                <p className="text-center text-xs text-gray-500 mt-2">
                  Быстрое оформление через Telegram
                </p>
              </div>
            </div>
          </div>

          {/* Product Badges */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Быстрая доставка</h3>
                <p className="text-xs text-gray-500">По Ташкенту в течение 24 часов. По Узбекистану — 2-3 дня.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">{language === 'uz' ? 'Qaytarish' : 'Возврат'}</h3>
                <p className="text-xs text-gray-500">
                  {language === 'uz' 
                    ? "Mahsulot ko'rinishi saqlangan holda 3 kun ichida qaytarish." 
                    : "Возврат в течение 3 дней при сохранении товарного вида."}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Гарантия качества</h3>
                <p className="text-xs text-gray-500">Премиальное серебро 925 пробы.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile Purchase (< 1024px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 lg:hidden shadow-2xl pb-[calc(12px+env(safe-area-inset-bottom,0px))]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500 line-clamp-1">{product.name}</p>
            <p className="text-sm font-bold text-gray-900">{product.price.toLocaleString('ru-RU')} сум</p>
          </div>
          <TelegramButton product={product} variant="primary" className="min-h-[44px] text-xs px-5 py-2.5 rounded-full" />
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16 sm:mt-24">
        <h2 className="text-xl sm:text-3xl tracking-tight mb-8">Вам может понравиться</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts
            .slice(0, 4)
            .map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group block bg-white rounded-xl border border-gray-100 p-2 sm:p-3"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg mb-3">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-[#C8102E] transition-colors line-clamp-2 min-h-[2.5rem]">
                  {relatedProduct.name}
                </h3>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {relatedProduct.price.toLocaleString('ru-RU')} сум
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
