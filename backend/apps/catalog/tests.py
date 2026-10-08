from django.test import TestCase
from apps.catalog.models import Category, Product


class CatalogApiTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name='Jewelry',
            name_uz='Zargarlik',
            slug='jewelry',
        )
        self.product = Product.objects.create(
            name='Silver Ring',
            name_uz='Kumush uzuk',
            slug='silver-ring',
            description='Test product',
            description_uz='Test mahsulot',
            price=150000,
            category=self.category,
            is_active=True,
            is_new=True,
            rating=4.8,
            reviews_count=10,
            stock_quantity=5,
            characteristics='Solid silver',
            characteristics_uz='Yumshoq kumush',
        )

    def test_products_endpoint_returns_200(self):
        response = self.client.get('/api/catalog/products/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('results', response.json())

    def test_categories_endpoint_returns_200(self):
        response = self.client.get('/api/catalog/categories/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json()) >= 1)
