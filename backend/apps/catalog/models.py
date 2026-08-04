from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError

class Category(models.Model):
    name = models.CharField(max_length=255)
    name_uz = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True, verbose_name="Загрузить фото")
    image_url = models.URLField(max_length=1000, blank=True, null=True, verbose_name="Или URL картинки")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def get_image_url(self):
        return self.image.url if self.image else self.image_url

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    name = models.CharField(max_length=255)
    name_uz = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField(blank=True, verbose_name="Описание (RU)")
    description_uz = models.TextField(blank=True, verbose_name="Описание (UZ)")
    price = models.DecimalField(max_digits=12, decimal_places=0) # Using 0 decimal places for UZS
    category = models.ForeignKey(Category, related_name='products', on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
    is_new = models.BooleanField(default=False)
    rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    stock_quantity = models.IntegerField(default=0)
    characteristics = models.TextField(blank=True, verbose_name="Характеристики (RU)")
    characteristics_uz = models.TextField(blank=True, verbose_name="Характеристики (UZ)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.price < 0:
            raise ValidationError("Price cannot be negative")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="Загрузить фото")
    image_url = models.URLField(max_length=1000, blank=True, null=True, verbose_name="Или URL картинки")
    alt = models.CharField(max_length=255, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']

class ProductSize(models.Model):
    product = models.ForeignKey(Product, related_name='sizes', on_delete=models.CASCADE)
    size = models.CharField(max_length=50)

    def __str__(self):
        if self.product_id:
            return f"{self.product.name} - {self.size}"
        return f"New Size - {self.size}"
