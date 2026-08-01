import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'uz';

interface Translations {
  [key: string]: {
    ru: string;
    uz: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { ru: 'Главная', uz: 'Bosh sahifa' },
  catalog: { ru: 'Каталог', uz: 'Katalog' },
  necklaces: { ru: 'Ожерелья', uz: 'Bo‘yinbog‘lar' },
  chains: { ru: 'Цепочки', uz: 'Zanjirlar' },
  pendants: { ru: 'Кулоны', uz: 'Zabonlar' },
  
  // Hero section
  heroTitle1: { ru: 'Silver jewelry и ', uz: 'Kumush taqinchoqlar va ' },
  heroTitle2: { ru: 'серебряные украшения', uz: 'kumush bezaklar' },
  heroTitle3: { ru: ' в Ташкенте — Anori', uz: ' Toshkentda — Anori' },
  heroSubtitle: { 
    ru: 'Минималистичные украшения премиум-класса для ценителей утонченного стиля', 
    uz: 'Nafis stil ixlosmandlari uchun premium klassdagi minimalistik taqinchoqlar' 
  },
  viewCollection: { ru: 'Смотреть коллекцию', uz: 'To‘plamni ko‘rish' },
  
  // Sections
  popularJewelry: { ru: 'Популярные украшения', uz: 'Ommabop taqinchoqlar' },
  popularSubtitle: { ru: 'Наши бестселлеры — воплощение элегантности и минимализма', uz: 'Bizning bestsellerlar — nafosat va minimalizm timsoli' },
  viewAllCollection: { ru: 'Посмотреть всю коллекцию', uz: 'Barcha to‘plamni ko‘rish' },
  categories: { ru: 'Категории', uz: 'Kategoriyalar' },
  categoriesSubtitle: { ru: 'Найдите украшение для любого случая', uz: 'Har qanday holat uchun taqinchoq toping' },
  goToCategory: { ru: 'Перейти в категорию', uz: 'Kategoriyaga o‘tish' },
  
  // Benefits
  freeDelivery: { ru: 'Бесплатная доставка', uz: 'Bepul yetkazib berish' },
  freeDeliveryDesc: { ru: 'Доставляем по Ташкенту в течение 24 часов. По Узбекистану — 2-3 дня', uz: 'Toshkent bo‘ylab 24 soat ichida. O‘zbekiston bo‘ylab — 2-3 kun' },
  qualityGuarantee: { ru: 'Гарантия качества', uz: 'Sifat kafolati' },
  qualityGuaranteeDesc: { ru: 'Все украшения изготовлены из качественного серебра 925 пробы', uz: 'Barcha taqinchoqlar yuqori sifatli 925 probali kumushdan tayyorlangan' },
  luxuryPackaging: { ru: 'Роскошная упаковка', uz: 'Hushbo‘y va chiroyli qadoqlash' },
  luxuryPackagingDesc: { ru: 'Каждое украшение упаковано в премиальную коробку с лентой', uz: 'Har bir taqinchoq tasmali premium qutiga qadoqlangan' },
  
  // Testimonials
  reviews: { ru: 'Отзывы покупателей', uz: 'Mijozlar fikrlari' },
  reviewsSubtitle: { ru: 'Что говорят наши клиенты', uz: 'Mijozlarimiz biz haqimizda nima deyishadi' },
  review1: {
    ru: '"Купила колье — невероятное качество! Минималистичный дизайн идеально подходит для повседневной носки."',
    uz: '"Kumush bo‘yinbog‘ xarid qildim — sifati ajoyib! Minimalistik dizayn har kunlik taqish uchun juda mos."'
  },
  review2: {
    ru: '"Заказывала кулон в подарок. Упаковка превзошла все ожидания — настоящий люкс! Доставка быстрая."',
    uz: '"Sovg‘a uchun zabon buyurtma qilgan edim. Qadoqlash kutilganidan ham a‘lo darajada — haqiqiy lyuks! Yetkazib berish juda tez."'
  },
  review3: {
    ru: '"Очень довольна покупкой цепочки. Элегантная, тонкая, именно то, что искала. Спасибо Anori!"',
    uz: '"Zanjir xarididan juda mamnunman. Nafis, nozik, aynan men qidirgan narsa. Rahmat Anori!"'
  },
  followInstagram: { ru: 'Следите за нами в Instagram', uz: 'Bizni Instagramda kuzatib boring' },
  subscribe: { ru: 'Подписаться', uz: 'Azo bo‘lish' },

  // Footer
  footerDesc: {
    ru: 'Премиальные украшения ручной работы. Минималистичный дизайн для современных и стильных.',
    uz: 'Qo‘lda tayyorlangan premium taqinchoqlar. Zamonaviy va stil egalari uchun minimalistik dizayn.'
  },
  navigation: { ru: 'Навигация', uz: 'Navigatsiya' },
  contacts: { ru: 'Контакты', uz: 'Kontaktlar' },
  socialMedia: { ru: 'Социальные сети', uz: 'Ijtimoiy tarmoqlar' },
  address: { ru: 'г. Ташкент, Узбекистон Овози 35', uz: 'Toshkent sh., O‘zbekiston Ovozi ko‘chasi 35' },
  allRightsReserved: { ru: 'Все права защищены.', uz: 'Barcha huquqlar himoyalangan.' },
  seoTitle: {
    ru: 'Anori Jewelry — ваш гид по стилю в мире серебра',
    uz: 'Anori Jewelry — kumush olamidagi sizning stil bo‘yicha yo‘l ko‘rsatuvchingiz'
  },
  seoText1: {
    ru: 'Anori — это ювелирный магазин серебряных украшений. Мы предлагаем широкий выбор: silver jewelry, silver rings, silver necklace, серебряные украшения, серебряные кольца, серебряные цепочки в Ташкенте с быстрой доставкой по всему Узбекистану.',
    uz: 'Anori — bu kumush taqinchoqlar va bezaklar do‘koni. Biz keng turdagi mahsulotlarni taklif etamiz: kumush uzuklar (silver rings), bo‘yinbog‘lar (silver necklace), zanjirlar (silver chain) va kumush buyumlar Toshkentda butun O‘zbekiston bo‘ylab tez yetkazib berish bilan.'
  },
  seoText2: {
    ru: 'Наш магазин украшений Anori Tashkent специализируется на минималистичных и трендовых изделиях, которые подчеркнут вашу индивидуальность и добавят утонченности любому образу.',
    uz: 'Bizning Anori Tashkent taqinchoqlar do‘konimiz sizning individualligingizni ta’kidlaydigan va har qanday ko‘rinishga nafosat bag‘ishlaydigan minimalistik hamda trenddagi buyumlarga ixtisoslashgan.'
  },
  
  // Cart & Checkout
  cart: { ru: 'Корзина', uz: 'Savat' },
  checkout: { ru: 'Оформление заказа', uz: 'Buyurtmani rasmiylashtirish' },
  addToCart: { ru: 'Добавить в корзину', uz: 'Savatga qo‘shish' },
  buyInOneClick: { ru: 'Купить в 1 клик', uz: '1 bosishda xarid qilish' },
  total: { ru: 'Итого', uz: 'Jami' },
  emptyCart: { ru: 'Ваша корзина пуста', uz: 'Savatingiz bo‘sh' },
  
  // Catalog & Filter
  allProducts: { ru: 'Все товары', uz: 'Barcha mahsulotlar' },
  filter: { ru: 'Фильтр', uz: 'Filtr' },
  sort: { ru: 'Сортировка', uz: 'Saralash' },
  price: { ru: 'Цена', uz: 'Narx' },
  currency: { ru: 'сум', uz: 'so‘m' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('anori_lang');
    return (saved === 'uz' || saved === 'ru') ? saved : 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('anori_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
