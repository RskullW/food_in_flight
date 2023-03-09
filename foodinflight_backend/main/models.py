from django.db import models


class Product(models.Model):
    TYPES = (
        ('Food', 'Еда'),
        ('Drink', 'Напиток')
    )
    
    is_active = models.BooleanField(default=False)

    slug = models.SlugField(max_length=100, unique=True)
    type = models.CharField(max_length=50, choices=TYPES, blank=False)
    category = models.CharField(max_length=100, blank=False)

    title = models.CharField(max_length=255, blank=False)
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
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'



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