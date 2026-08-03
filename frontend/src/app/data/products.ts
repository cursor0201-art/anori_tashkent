export interface Product {
  id: string;
  name: string;
  name_uz?: string;
  price: number;
  category: "necklace" | "chain" | "pendant" | string;
  image: string;
  images: string[];
  description: string;
  description_uz?: string;
  characteristics?: Record<string, string>;
  characteristics_uz?: Record<string, string>;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Золотое колье «Элегантность»",
    price: 45000,
    category: "necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ],
    description: "Изысканное золотое колье ручной работы. Минималистичный дизайн подчеркивает природную красоту и элегантность. Идеально подходит для повседневной носки и особых случаев.",
    featured: true
  },
  {
    id: "2",
    name: "Минималистичная цепочка",
    price: 28000,
    category: "chain",
    image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
    ],
    description: "Утонченная золотая цепочка в минималистичном стиле. Универсальное украшение, которое дополнит любой образ.",
    featured: true
  },
  {
    id: "3",
    name: "Кулон «Луна»",
    price: 32000,
    category: "pendant",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    description: "Элегантный кулон в форме полумесяца из золота 585 пробы. Символ женственности и загадочности.",
    featured: true
  },
  {
    id: "4",
    name: "Колье с жемчугом",
    price: 52000,
    category: "necklace",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ],
    description: "Роскошное колье с натуральным жемчугом. Классика, которая никогда не выйдет из моды."
  },
  {
    id: "5",
    name: "Тонкая золотая цепь",
    price: 24000,
    category: "chain",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80"
    ],
    description: "Деликатная золотая цепочка для ежедневной носки. Невесомость и изящество в каждой детали."
  },
  {
    id: "6",
    name: "Кулон «Звезда»",
    price: 29000,
    category: "pendant",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
    ],
    description: "Лаконичный кулон в форме звезды. Символ стремлений и мечтаний."
  },
  {
    id: "7",
    name: "Многослойное колье",
    price: 48000,
    category: "necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
    ],
    description: "Трендовое многослойное колье из золота. Создает эффектный образ одним движением."
  },
  {
    id: "8",
    name: "Цепь плетение «Якорь»",
    price: 35000,
    category: "chain",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
    ],
    description: "Классическая золотая цепь якорного плетения. Надежность и стиль."
  },
  {
    id: "9",
    name: "Кулон «Сердце»",
    price: 38000,
    category: "pendant",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    description: "Романтичный кулон в форме сердца. Идеальный подарок для любимых."
  }
];
