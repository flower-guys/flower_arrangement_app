from django.db import models
from fitflowers.users import models as user_models
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Flowers(models.Model):
    
    """ Flowers Model """
    
    enname = models.CharField(max_length=140)
    krname = models.CharFiled(max_length=140)
    file = models.ImageField()

    def __str__(self):
        return {}({}).format(self.krname, self.enname)


class Bouquet(TimeStampedModel):
    
    """ Bouquet Model """
    
    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)
    flowers = models.ManyToManyField(Flowers)

    def __str__(self):
        return '{} - {}'.format(self.caption, self.creator)
    
    class Meta:
        ordering = ['-created_at']

