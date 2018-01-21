from django.db import models
from fitflowers.users import models as user_models
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Flower(models.Model):
    
    """ Flower Model """
    
    enname = models.CharField(max_length=140)
    krname = models.CharField(max_length=140)
    file = models.ImageField()

    def __str__(self):
        return '{}({})'.format(self.krname, self.enname)


# class Bunch(TimeStampedModel):
    
#     """ Bunch Model """

#     flower = models.ForeignKey(Flower, null=True, related_name='bunches')
#     user = models.ForeignKey(user_models.User, null=True)

#     def __str__(self):
#         return '{} - {}'.format(self.bouquet, self.flower)


class Bouquet(TimeStampedModel):
    
    """ Bouquet Model """
    
    file = models.ImageField()
    user = models.ForeignKey(user_models.User, null=True)
    flowers = models.ForeignKey(Flower, blank=True, null=True)

    def __str__(self):
        return '{} - {}'.format(self.file, self.user)
    
    class Meta:
        ordering = ['-created_at']


