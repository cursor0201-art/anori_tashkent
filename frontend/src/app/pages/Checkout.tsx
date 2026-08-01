import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isUz = language === 'uz';

    // Construct Telegram message with product links for rich previews
    const itemsList = items.map(item => {
      const productUrl = `${window.location.origin}/product/${item.id}`;
      return isUz
        ? `${item.name} — ${item.quantity} dona — ${(item.price * item.quantity).toLocaleString('uz-UZ')} so‘m\n` +
          `Havola: ${productUrl}`
        : `${item.name} — ${item.quantity} шт — ${(item.price * item.quantity).toLocaleString('ru-RU')} сум\n` +
          `Ссылка: ${productUrl}`;
    }).join('\n\n');

    const message = isUz
      ? `Assalomu alaykum, buyurtma bermoqchiman.\n\n` +
        `Ism: ${formData.name}\n` +
        `Telefon: ${formData.phone}\n` +
        `Manzil: ${formData.address}\n` +
        `Izoh: ${formData.comment || '-'}\n\n` +
        `Mahsulotlar:\n${itemsList}\n\n` +
        `Jami summa: ${totalPrice.toLocaleString('uz-UZ')} so‘m`
      : `Здравствуйте, хочу оформить заказ.\n\n` +
        `Имя: ${formData.name}\n` +
        `Телефон: ${formData.phone}\n` +
        `Адрес: ${formData.address}\n` +
        `Комментарий: ${formData.comment || '-'}\n\n` +
        `Товары:\n${itemsList}\n\n` +
        `Общая сумма: ${totalPrice.toLocaleString('ru-RU')} сум`;

    const telegramUrl = `https://t.me/Anori_store?text=${encodeURIComponent(message)}`;

    setOrderPlaced(true);

    // Use a single, reliable redirect method
    setTimeout(() => {
      window.location.assign(telegramUrl);
      clearCart();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl tracking-tight mb-4">Заказ оформлен!</h1>
          <p className="text-gray-600 mb-8">
            Спасибо за покупку! Мы свяжемся с вами в ближайшее время для подтверждения заказа.
          </p>
          <p className="text-sm text-gray-500">
            Перенаправление на главную страницу...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl tracking-tight mb-12">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-2xl tracking-tight mb-6">Контактные данные</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm text-gray-700">
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm text-gray-700">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
                    placeholder="+998 88 688 67 77"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl tracking-tight mb-6">Доставка</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="address" className="block mb-2 text-sm text-gray-700">
                    Адрес доставки *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
                    placeholder="Город, улица, дом, квартира"
                  />
                </div>

                <div>
                  <label htmlFor="comment" className="block mb-2 text-sm text-gray-700">
                    Комментарий к заказу
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent resize-none"
                    placeholder="Дополнительная информация о доставке"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-full hover:bg-yellow-700 transition-colors duration-300"
            >
              Подтвердить заказ
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
            <h2 className="text-xl mb-6">Ваш заказ</h2>

            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex space-x-4 text-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No photo
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-gray-500">Количество: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-medium">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} сум
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Товары</span>
                <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-xl">
                <span>Итого</span>
                <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
