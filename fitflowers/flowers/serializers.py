from rest_framework import serializers
from . import models
from nomadgram.users import models as user_model


class FlowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Flower
        fields = (
            'enname',
            'krname',
            'file',
        )


class BouquetSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Bouquet
        fields = (
            'file',
            'user',
            'flowers',
        )


class InputBouquetSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Bouquet
        fields = (
            'file',
            'flowers',
        )


class InputFlowerSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Flower
        fields = (
            'flower',
        )


class InputUserFlowerSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.UserFlower
        fields = ('flower,
                  )


class UserFlowerSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.UserFlower
        fields = (
            'flower',
            'user',
            'bouquet',
        )
