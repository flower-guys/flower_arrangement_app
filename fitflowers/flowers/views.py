from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


class Flower(APIView):

    def find_flower(self, flower_id):
        try:
            flower = models.Flower.objects.get(id=flower_id)
            return flower
        except models.Flower.DoesNotExist:
            return None

    def get(self, request, flower_id, format=None):

        flower = self.find_flower(flower_id)

        if flower is None:
            return Resonse(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.FlowerSerializer(flower)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, flower_id, format=None):

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        flower = find_flower(flower_id)

        if flower is None:
            return Resonse(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.FlowerSerializer(
            flower, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Flowers(APIView):

    def get(self, request, format=None):

        try:
            flowers = models.Flower.object.all(many=True)
        except models.Flower.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.FlowerSerializer(flowers)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializer.FlowerSerializer(request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Bouquets(APIView):

    def get(self, request, format=None):

        user = request.user

        bouquets = models.Bouquet.objects.filter(user=user)

        serializer = serializers.BouquetSerializer(bouquets, many=True)

        return Response(data=serializers.data, status=HTTP_200_OK)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.InputBouquetSerializer(request.data)

        if serializer.is_valid():

            serializer.save(user=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Bouquet(APIView):

    def find_bouquet(self, bouquet_id, user):
        try:
            bouquet = models.Bouquet.objects.get(id=bouquet_id, user=user)
            return bouquet
        except models.Bouquet.DoesNotExist:
            return None

    def get(self, request, bouquet_id, format=None):

        user = request.user

        bouquet = self.find_bouquet(bouquet_id, user)

        if bouquet is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.BouquetSerializer(bouquet)

        return Response(data=serailizer.data, status=status.HTTP_200_OK)

    def put(self, request, bouquet_id, format=None):

        user = request.user

        bouquet = self.find_bouquet(bouquet_id, user)

        if bouquet is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.BouquetSerializer(
            bouquet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserFlowers(APIView):

    def find_bouquet(self, bouquet_id, user):
        try:
            bouquet = models.Bouquet.objects.get(id=bouquet_id, user=user)
            return bouquet
        except models.Bouquet.DoesNotExist:
            return None

    def get(self, request, bouquet_id, format=None):

        user = request.user

        bouquet = find_bouquet(bouquet_id, user)

        if bouquet is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        flowers = models.UserFlower.get(user=user, bouquet=bouquet)

        serializer = serializers.UserFlowerSerializer(flowers, many=True)

        if serializer.is_valid():
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Resonse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, bouquet_id, format=None):

        user = request.user

        bouquet = find_bouquet(bouquet_id, user)

        if bouquet is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.InputUserFlowerSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=user, boquet=bouquet)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserFlower(APIView):

    def find_user_flower(self, user_flower_id, user):

        try:
            flower = models.UserFlower.objects.get(
                id=user_flower_id, user=user)
            return flower
        except models.Flower.DoesNotExist:
            return None

    def get(self, request, user_flower_id, format=None):

        user = request.user

        user_flower = self.find_user_flower(user_flower_id, user)

        if user_flower is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.UserFlowerSerializer(flower)

        if serializer.is_valid():
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_flower_id, format=None):

        user = request.user

        user_flower = self.find_user_flower(user_flower_id, user)

        if user_flower is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        user_flower.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
