import { Link } from 'react-router';
import { Product } from '../data/products';
import { TelegramButton } from './TelegramButton';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const title = language === 'uz' ? (product.name_uz || product.name) : product.name;
  const currency = language === 'uz' ? "so'm" : "сум";

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-2 sm:p-3 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block flex-1">
        {/* Fixed Aspect Ratio 1:1 Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 mb-3">
          <img
            src={product.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Title with line-clamp-2 & Price */}
        <div className="space-y-1.5 mb-3">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-[#C8102E] transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
            {title}
          </h3>
          <p className="text-sm sm:text-base font-bold text-gray-900">
            {product.price.toLocaleString('ru-RU')} <span className="text-xs font-normal text-gray-500">{currency}</span>
          </p>
        </div>
      </Link>

      {/* Touch-optimized Order Button (Full width on mobile, 44px min height) */}
      <div className="mt-auto">
        <TelegramButton
          product={product}
          variant="primary"
          className="w-full min-h-[44px] text-xs sm:text-sm py-2.5 px-3 rounded-lg shadow-none hover:shadow-md"
        />
      </div>
    </div>
  );
}
