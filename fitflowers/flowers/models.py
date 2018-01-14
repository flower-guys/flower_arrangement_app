from django.db import models
from fitflowers.users import models as user_models

class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Bouquet(TimeStampedModel):
    """ Bouquet """
    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)


class Comment(TimeStampedModel):
    """ Comment Model """
    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)
    bouquet = models.ForeignKey(Bouquet, null=True)

class Like(TimeStampedModel):
    """ Like Model """
    creator = models.ForeignKey(user_models.User, null=True)
    bouquet = models.ForeignKey(Bouquet, null=True)

class Bunch():
    creator = models.ForeignKey(Bouquet, null=True)
    bouquet = models.ForeignKey(Bouquet, null=True)

