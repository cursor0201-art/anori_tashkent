from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductSize

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'name_uz', 'slug', 'image_url', 'created_at']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt', 'sort_order']

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['id', 'size']

class ProductListSerializer(serializers.ModelSerializer):
    # For listing, we only need the first image
    image = serializers.SerializerMethodField()
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'name_uz', 'slug', 'price', 
            'image', 'category_slug', 'is_new', 'rating'
        ]

    def get_image(self, obj):
        first_image = obj.images.first()
        return first_image.image_url if first_image else None

class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    sizes = ProductSizeSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'name_uz', 'slug', 'description', 
            'price', 'category', 'category_name', 'is_active', 
            'is_new', 'rating', 'reviews_count', 'stock_quantity', 
            'characteristics', 'images', 'sizes', 'created_at', 'updated_at'
        ]
