from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
import uuid




class ProductCategory(models.Model):
    slug = models.SlugField(max_length=50, unique=True)
    title = models.CharField(max_length=100)

    image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория товаров'
        verbose_name_plural = 'Категории товаров'


class GroupProductCategory(models.Model):
    slug = models.SlugField(max_length=50, unique=True)
    title = models.CharField(max_length=100)

    icon = models.ImageField(upload_to='images/', null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Группа категорий товаров'
        verbose_name_plural = 'Группы категорий товаров'


class ProductCuisine(models.Model):
    slug = models.SlugField(max_length=50, unique=True)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Кухня'
        verbose_name_plural = 'Кухни'


class Product(models.Model):
    class TypeOfProduct(models.TextChoices):
        FOOD = 'F', _('Еда')
        DRINK = 'D', _('Напиток')
    
    is_active = models.BooleanField(default=False)
    is_popular = models.BooleanField(default=False)

    slug = models.SlugField(max_length=100, unique=True)
    type = models.CharField(max_length=1, choices=TypeOfProduct.choices, default=TypeOfProduct.FOOD, blank=False)
    
    category = models.ForeignKey(ProductCategory, on_delete=models.DO_NOTHING, blank=True, null=True)
    cuisine = models.ForeignKey(ProductCuisine, on_delete=models.DO_NOTHING, blank=True, null=True)
    group_categories = models.ManyToManyField(GroupProductCategory, blank=True)
    
    title = models.CharField(max_length=254, blank=False)
    description = models.TextField()
    composition = models.TextField()
    price = models.IntegerField()

    weight = models.IntegerField()
    calories = models.IntegerField()
    proteins = models.IntegerField()
    fats = models.IntegerField()
    carbohydrates = models.IntegerField()

    def __str__(self):
        return self.title

    def images(self):
        return Image.objects.filter(item=self)    

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    ordering = models.IntegerField()

    def __str__(self):
        return 'Фото товара ' + self.item.title

    class Meta:
        ordering = ['ordering']
        verbose_name = 'Фото товара'
        verbose_name_plural = 'Фото товаров'


class Order(models.Model):
    class OrderStates(models.TextChoices):
        PENDING = 'PENDING', _('Ожидает оплаты')
        PAID = 'PAID', _('Оплачен')
        COOKING = 'COOKING', _('Готовится')
        DELIVERING = 'DELIVERING', _('В доставке')
        DELIVERED = 'DELIVERED', _('Доставлен')
        CANCELED = 'CANCELED', _('Отменен')
    
    def get_items_price(self):
        return sum([item.price for item in self.items()])
    
    unique_uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    state = models.CharField(max_length=10, choices=OrderStates.choices, default=OrderStates.PENDING, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    items_price = property(get_items_price)
    delivery_price = models.IntegerField(default=200)
    total_price = property(lambda self: self.items_price + self.delivery_price)

    name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=254)
    phone = PhoneNumberField(region='RU')
    address = models.CharField(max_length=254)

    def items(self):
        return OrderProduct.objects.filter(order=self)
    
    def __str__(self):
        return 'Заказ № ' + str(self.unique_uuid)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
    

class OrderProduct(models.Model):
    unique_uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    order_uuid = property(lambda self: self.order.unique_uuid)
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)
    price = property(lambda self: self.item.price * self.amount)
    add_ice = models.BooleanField(default=False)

    def item_slug(self):
        return self.item.slug

    def item_title(self):
        return self.item.title

    def __str__(self):
        return self.item.title + ' в заказе'
    
    class Meta:
        verbose_name = 'Товар в заказе'
        verbose_name_plural = 'Товары в заказе'
