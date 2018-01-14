from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Bouquet)
class BouquetAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Bunch)
class BunchAdmin(admin.ModelAdmin):
    pass