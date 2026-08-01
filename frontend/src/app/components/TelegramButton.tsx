import { Send } from 'lucide-react';
import { Product } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

interface TelegramButtonProps {
    product: Product;
    variant?: 'primary' | 'outline' | 'minimal';
    className?: string;
}

export function TelegramButton({ product, variant = 'primary', className = '' }: TelegramButtonProps) {
    const { language, t } = useLanguage();

    const handleTelegramOrder = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const handleOrder = () => {
            const isUz = language === 'uz';
            const message = isUz
                ? `Assalomu alaykum, taqinchoq buyurtma qilmoqchiman.\n\n` +
                  `Nomi: ${product.name}\n` +
                  `Narxi: ${product.price.toLocaleString('uz-UZ')} so‘m\n` +
                  `Kategoriya: ${product.category}\n` +
                  `Havola: ${window.location.origin}/product/${product.id}\n\n` +
                  `Buyurtmani rasmiylashtirmoqchiman.`
                : `Здравствуйте, хочу заказать украшение.\n\n` +
                  `Название: ${product.name}\n` +
                  `Цена: ${product.price.toLocaleString('ru-RU')} сум\n` +
                  `Категория: ${product.category}\n` +
                  `Ссылка: ${window.location.origin}/product/${product.id}\n\n` +
                  `Хочу оформить заказ.`;

            const telegramUrl = `https://t.me/Anori_store?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
        };
        handleOrder();
    };

    const baseStyles = "inline-flex items-center justify-center space-x-2 transition-all duration-300 rounded-full font-medium tracking-wide";

    const variants = {
        primary: "bg-[#24A1DE] hover:bg-[#1E88BE] text-white px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
        outline: "border-2 border-[#24A1DE] text-[#24A1DE] hover:bg-[#24A1DE] hover:text-white px-6 py-3",
        minimal: "text-[#24A1DE] hover:text-[#1E88BE] p-2 hover:bg-[#24A1DE]/10"
    };

    return (
        <button
            onClick={handleTelegramOrder}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            title={language === 'uz' ? "Telegram'da buyurtma berish" : "Заказать в Telegram"}
        >
            <Send className={variant === 'minimal' ? "w-5 h-5" : "w-4 h-4"} />
            {variant !== 'minimal' && <span>{language === 'uz' ? "Telegram'da buyurtma berish" : "Заказать в Telegram"}</span>}
        </button>
    );
}
