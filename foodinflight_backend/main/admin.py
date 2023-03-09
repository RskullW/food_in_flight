from django.contrib import admin
from .models import *


@admin.action(description='Сделать выбранные продукты неактивными')
def make_products_inactive(modeladmin, request, queryset):
    queryset.update(is_active=False)    

@admin.action(description='Сделать выбранные продукты активными')
def make_products_active(modeladmin, request, queryset):
    queryset.update(is_active=True)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('is_active', 'title', 'slug', 'price')
    actions = [make_products_inactive, make_products_active]


admin.site.register(Product, ProductAdmin)
admin.site.register(Image)