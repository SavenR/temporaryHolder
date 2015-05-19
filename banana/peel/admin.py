from .models import Hobby
# from .models import User
from .models import UserProfile
from django.contrib import admin

# Register your models here.
admin.site.register(Hobby)
# admin.site.register(User)
admin.site.register(UserProfile)

#import in this format
# Register