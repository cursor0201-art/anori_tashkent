import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import api from '../services/api';

export function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; name_uz: string; slug: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]); // Increased for UZS
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('catalog/categories/');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data && response.data.results) {
          setCategories(response.data.results);
        }
      } catch (err) {
        console.error('Failed to fetch categories for filter:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('catalog/products/');
        // Mapping Django model to Frontend interface if needed
        if (response.data && response.data.results) {
          const mappedProducts = response.data.results.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            name_uz: p.name_uz,
            price: parseFloat(p.price),
            category: p.category_slug || (p.category_name || '').toLowerCase(),
            image: p.image || '',
            images: p.image ? [p.image] : [],
            description: '', // Not in list view
            featured: p.is_new
          }));
          setProducts(mappedProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory || product.category === selectedCategory.toLowerCase();
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [products, selectedCategory, priceRange]);

  const activeCategoryObj = categories.find(c => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO
        title={activeCategoryObj ? `${activeCategoryObj.name} — Silver jewelry в Ташкенте` : 'Каталог серебряных украшений и silver jewelry в Ташкенте'}
        description="Каталог серебряных украшений Anori Tashkent: silver rings, silver necklace, silver chain, серебряные цепочки и кулоны 925 пробы с быстрой доставкой."
        keywords="silver jewelry, silver rings, silver necklace, silver chain, серебряные украшения, серебряные цепочки, серебряные кольца, кулоны, Ташкент"
      />
      <div className="mb-12">
        <h1 className="text-4xl tracking-tight mb-4">
          {activeCategoryObj ? activeCategoryObj.name : 'Каталог'}
        </h1>
        <p className="text-gray-600">Выберите украшение из нашей коллекции</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-lg mb-6 flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Фильтры</span>
            </h3>

            {/* Category Filter */}
            <div className="mb-8">
              <h4 className="text-sm tracking-wider uppercase mb-4 text-gray-700">Категория</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={!selectedCategory}
                    onChange={() => setSelectedCategory(null)}
                    className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                  />
                  <span className="text-sm text-gray-700">Все украшения</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                    />
                    <span className="text-sm text-gray-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="text-sm tracking-wider uppercase mb-4 text-gray-700">Цена</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange[0] === 0 && priceRange[1] === 10000000}
                    onChange={() => setPriceRange([0, 10000000])}
                    className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                  />
                  <span className="text-sm text-gray-700">Все цены</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange[0] === 105000 && priceRange[1] === 300000}
                    onChange={() => setPriceRange([105000, 300000])}
                    className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                  />
                  <span className="text-sm text-gray-700">105 000 - 300 000 сум</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange[0] === 300000 && priceRange[1] === 700000}
                    onChange={() => setPriceRange([300000, 700000])}
                    className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                  />
                  <span className="text-sm text-gray-700">300 000 - 700 000 сум</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange[0] === 700000 && priceRange[1] === 10000000}
                    onChange={() => setPriceRange([700000, 10000000])}
                    className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                  />
                  <span className="text-sm text-gray-700">От 700 000 сум</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm border border-gray-300 px-4 py-2 rounded-lg hover:border-gray-400 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>

          {showFilters && (
            <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-white">
              <div className="mb-6">
                <h4 className="text-sm tracking-wider uppercase mb-4 text-gray-700">Категория</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category-mobile"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory(null)}
                      className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                    />
                    <span className="text-sm text-gray-700">Все украшения</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category-mobile"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                      />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm tracking-wider uppercase mb-4 text-gray-700">Цена</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={priceRange[0] === 0 && priceRange[1] === 10000000}
                      onChange={() => setPriceRange([0, 10000000])}
                      className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                    />
                    <span className="text-sm text-gray-700">Все цены</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={priceRange[0] === 0 && priceRange[1] === 250000}
                      onChange={() => setPriceRange([0, 250000])}
                      className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                    />
                    <span className="text-sm text-gray-700">До 250 000 сум</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={priceRange[0] === 250000 && priceRange[1] === 500000}
                      onChange={() => setPriceRange([250000, 500000])}
                      className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                    />
                    <span className="text-sm text-gray-700">250 000 - 500 000 сум</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={priceRange[0] === 500000 && priceRange[1] === 10000000}
                      onChange={() => setPriceRange([500000, 10000000])}
                      className="w-4 h-4 text-yellow-700 border-gray-300 focus:ring-yellow-700"
                    />
                    <span className="text-sm text-gray-700">От 500 000 сум</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-600">
              Найдено украшений: <span className="font-semibold text-gray-900">{filteredProducts.length}</span>
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-[#C8102E]" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-[#C8102E] underline"
              >
                Попробовать снова
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
            /* Responsive Grid: 2 cols on mobile (320-639px), 3 on tablet (640-1023px), 4 on desktop (1024px+) */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">Украшения не найдены</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
