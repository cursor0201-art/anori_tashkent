import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { language, t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl tracking-tight mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте украшения, чтобы продолжить</p>
          <Link
            to="/catalog"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-yellow-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl tracking-tight mb-12">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-6 pb-6 border-b border-gray-200">
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="mb-2 hover:text-yellow-700 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-900">
                    {item.price.toLocaleString('ru-RU')} сум
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
            <h2 className="text-xl mb-6">Итого</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-xl">
                <span>Всего</span>
                <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-gray-900 text-white text-center py-4 rounded-full hover:bg-yellow-700 transition-colors duration-300 mb-3"
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
              className="block w-full bg-[#24A1DE] text-white text-center py-3.5 rounded-full hover:bg-[#1E88BE] transition-colors duration-300"
            >
              {language === 'uz' ? "Telegram'da tezkor buyurtma" : "Быстрый заказ в Telegram"}
            </button>

            <Link
              to="/catalog"
              className="block text-center text-gray-600 hover:text-gray-900 text-sm mt-4 transition-colors"
            >
              {language === 'uz' ? 'Xaridni davom ettirish' : 'Продолжить покупки'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
