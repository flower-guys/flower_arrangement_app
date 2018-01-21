from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Flowers)
class FlowersAdmin(admin.ModelAdmin):

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
     