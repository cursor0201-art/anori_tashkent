from django.contrib import admin
from .models import Category, Product, ProductImage, ProductSize

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    fields = ('image', 'image_url', 'alt', 'sort_order')
    extra = 1

class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_uz', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'name_uz')
    fields = ('name', 'name_uz', 'slug', 'image', 'image_url')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_active', 'is_new', 'rating', 'stock_quantity')
    list_filter = ('category', 'is_active', 'is_new')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'name_uz', 'description')
    inlines = [ProductImageInline, ProductSizeInline]
    fieldsets = (
        (None, {
            'fields': ('name', 'name_uz', 'slug', 'description', 'description_uz', 'price', 'category')
        }),
        ('Характеристики (Материал, Проба, Вес и т.д.)', {
            'fields': ('characteristics',),
        }),
        ('Статус и Наличие', {
            'fields': ('is_active', 'is_new', 'stock_quantity', 'rating', 'reviews_count')
        }),
    )
