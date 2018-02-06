from django.db import models
from fitflowers.users import models as user_models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Flower(models.Model):

    """ Flower Model """

    enname = models.CharField(max_length=140)
    krname = models.CharField(max_length=140)
    file = models.ImageField()

    def __str__(self):
        return '{}({})'.format(self.krname, self.enname)


@python_2_unicode_compatible
class Bouquet(TimeStampedModel):

    """ Bouquet Model """

    file = models.ImageField()
    user = models.ForeignKey(user_models.User, null=True)
    flowers = models.ForeignKey(Flower, blank=True, null=True)

    def __str__(self):
        return '{} - {}'.format(self.file, self.user)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class UserFlower(TimeStampedModel):

    """ User Folwer Model """

    flower = models.ForeignKey(Flower)
    user = models.ForeignKey(user_models.User)
    bouquet = models.ForeignKey(Bouquet)

    def __str__(self):
        return '{} - {}'.format(self.flower, self.user)

    class Meta:
        ordering = ['-created_at']
