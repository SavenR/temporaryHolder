from django.forms import EmailField
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

__author__ = 'an author'

# Creating a new form
# Inheriting from the predefined UserCreationForm
class EmailUserCreationForm(UserCreationForm):
    #A custom field
    email = EmailField(required=True)

    #Meta class is letting us pull from our User model that is a part of Django
    class Meta:
        model = User
        fields = ('email', 'username', 'password1', 'password2')