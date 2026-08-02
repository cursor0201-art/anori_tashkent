import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { language } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl sm:text-3xl tracking-tight mb-4">Корзина пуста</h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">Добавьте украшения, чтобы продолжить</p>
        <Link
          to="/catalog"
          className="inline-flex items-center justify-center min-h-[44px] bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#C8102E] transition-colors font-medium text-sm"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <h1 className="text-2xl sm:text-4xl tracking-tight mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm items-center">
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 hover:text-[#C8102E] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {item.price.toLocaleString('ru-RU')} <span className="text-xs font-normal text-gray-500">сум</span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Plus/Minus quantity buttons (44px touch target) */}
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-0.5 bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Уменьшить количество"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Увеличить количество"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Remove Button (44px touch target) */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-[#C8102E] transition-colors p-2"
                    aria-label="Удалить товар"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary (Sticky on Desktop >= 1024px) */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-24 border border-gray-100">
            <h2 className="text-xl font-medium mb-6">Итого</h2>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span className="font-semibold text-gray-900">{totalPrice.toLocaleString('ru-RU')} сум</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span className="text-emerald-600 font-medium">Бесплатно</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Всего</span>
                <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full min-h-[48px] bg-gray-900 text-white text-center font-medium py-3.5 rounded-full hover:bg-[#C8102E] transition-colors duration-300 mb-3 flex items-center justify-center"
            >
              {language === 'uz' ? 'Buyurtmani rasmiylashtirish' : 'Оформить заказ'}
            </Link>

            <button
              onClick={() => {
                const isUz = language === 'uz';
                const itemsList = items.map(item => {
                  const productUrl = `${window.location.origin}/product/${item.id}`;
                  return isUz
                    ? `• ${item.name} — ${item.quantity} dona — ${(item.price * item.quantity).toLocaleString('uz-UZ')} so‘m\n  Havola: ${productUrl}`
                    : `• ${item.name} — ${item.quantity} шт — ${(item.price * item.quantity).toLocaleString('ru-RU')} сум\n  Ссылка: ${productUrl}`;
                }).join('\n\n');

                const message = isUz
                  ? `Assalomu alaykum, quyidagi mahsulotlarni buyurtma bermoqchiman:\n\n${itemsList}\n\nJami summa: ${totalPrice.toLocaleString('uz-UZ')} so‘m`
                  : `Здравствуйте, хочу заказать несколько товаров:\n\n${itemsList}\n\nОбщая сумма: ${totalPrice.toLocaleString('ru-RU')} сум`;

                window.open(`https://t.me/Anori_store?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="block w-full min-h-[48px] bg-[#24A1DE] text-white text-center font-medium py-3.5 rounded-full hover:bg-[#1E88BE] transition-colors duration-300 flex items-center justify-center"
            >
              {language === 'uz' ? "Telegram'da tezkor buyurtma" : "Быстрый заказ в Telegram"}
            </button>

            <Link
              to="/catalog"
              className="block text-center text-gray-600 hover:text-gray-900 text-xs sm:text-sm mt-4 transition-colors py-2"
            >
              {language === 'uz' ? 'Xaridni davom ettirish' : 'Продолжить покупки'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
