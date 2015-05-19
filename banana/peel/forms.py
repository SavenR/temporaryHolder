from django import forms
from .models import UserProfile

class UserProfileForm(forms.ModelForm):
    class Meta:

        model = UserProfile
        # fields = ['favorite_hobby', 'user', 'hair_color', 'birthdate', 'phone', 'created']
        fields = '__all__' # NOT default behavior
        # exclude = ['birthdate', 'favorite_hobby'] # don't show these fields
        widgets = {
            'birthdate': forms.DateInput(attrs={'class': 'datepicker'})
        }

