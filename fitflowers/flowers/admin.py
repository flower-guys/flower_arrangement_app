from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Flower)
class FlowerAdmin(admin.ModelAdmin):

    list_display_links = (
        'krname',
        'enname',
    )

    search_fields = (
        'krname',
        'enname',
    )

    list_display = (
        'krname',
        'enname',
        'file',
    )


@admin.register(models.Bouquet)
class BouquetAdmin(admin.ModelAdmin):

    list_display_links = (
        'file',
    )

    search_fields = (
        'user',
    )

    list_display = (
        'file',
        'user',
        'flowers',
    )


@admin.register(models.UserFlower)
class UserFlowerAdmin(admin.ModelAdmin):

    list_display_links = (
        'flower',
    )

    seartch_fields = (
        'user',
    )

    list_display = (
        'flower',
        'user',
        'bouquet',
    )
