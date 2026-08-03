from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductSize

class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'name_uz', 'slug', 'image_url', 'created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        url = None
        if obj.image:
            url = obj.image.url
        elif obj.image_url:
            url = obj.image_url

        if url:
            if request and not url.startswith('http://') and not url.startswith('https://'):
                return request.build_absolute_uri(url)
            return url
        return None

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt', 'sort_order']

    def get_image_url(self, obj):
        request = self.context.get('request')
        url = None
        if obj.image:
            url = obj.image.url
        elif obj.image_url:
            url = obj.image_url

        if url:
            if request and not url.startswith('http://') and not url.startswith('https://'):
                return request.build_absolute_uri(url)
            return url
        return None

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
        if first_image:
            request = self.context.get('request')
            url = None
            if first_image.image:
                url = first_image.image.url
            elif first_image.image_url:
                url = first_image.image_url

            if url:
                if request and not url.startswith('http://') and not url.startswith('https://'):
                    return request.build_absolute_uri(url)
                return url
        return None

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
