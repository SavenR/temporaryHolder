from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
# import localflavor
from localflavor.us.models import PhoneNumberField
from localflavor.us.models import USStateField
from localflavor.us.models import USZipCodeField
# from localflavor import us.forms.USStateSelect
# from localflavor import us.form.USZipCodeField

# Create your models here.

class Hobby(models.Model):
    name = models.CharField(max_length=128)

    def __unicode__(self):
        return self.name

# ### username is included with the imported User class
# class User(models.Model):
#     username = models.CharField(max_length=128)

#     def __unicode__(self):
#         return self.username

class UserProfile(models.Model):
    user = models.ForeignKey(User)
    birthdate = models.DateField(blank=True)
    # BLACK = 0
    # BROWN = 1
    # RED = 2
    # BLONDE = 3
    # SALTNPEPPER = 4
    # GREEN = 5

    HAIR_COLOR_CHOICES = (
        ('BLACK', 'Black'),
        ('BROWN', 'Brown'),
        ('RED', 'Red'),
        ('BLONDE', 'Blonde'),
        ('SALTNPEPPER', 'Salt N Peppa'),
        ('GREEN', 'Green'),
    )
    hair_color = models.CharField(max_length=128, choices = HAIR_COLOR_CHOICES, blank=True)

    favorite_hobby = models.ForeignKey(Hobby)

    # Without parens, will count from the time that the server was run up
    created = models.DateTimeField(default=datetime.now())
    # phone = PhoneNumberField(*args, **kwargs)
    phone = PhoneNumberField(blank=True)
    city = models.CharField(max_length=100)
    state = USStateField(blank=True)
    zip = USZipCodeField(blank=True)

    def __unicode__(self):
        return self.user.username














