from django.conf.urls import url
from . import views
urlpatterns = [
    # 이미지 피드
    url(
        regex=r'^(?P<flower_id>[0-9]+)/$',
        view=views.Flower.as_view(),
        name='Flower'
    ),
    url(
        regex=r'^$',
        view=views.Flowers.as_view(),
        name='Flowers'
    ),
    url(
        regex=r'^bouquets/$',
        view=views.Bouquets.as_view(),
        name='Bouquets'
    ),
    url(
        regex=r'^bouquet/(?P<bouquet_id>)$',
        view=views.Bouquet.as_view(),
        name='Bouquet'
    ),
    url(
        regex=r'^users/(?P<bouquet_id>)$',
        view=views.UserFlowers.as_view(),
        name='UserFlowers'
    ),
    url(
        regex=r'^users/flower/(?P<user_flower_id>)$',
        view=views.UserFlowers.as_view(),
        name='UserFlower'
    ),
]
