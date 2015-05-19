from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from blog.forms import EmailUserCreationForm
from django.contrib.auth.decorators import login_required

# from django.contribs.auth import logout
# from blog.forms import EmailUserCreationForm

# Create your views here.

def register(request):
    if request.method == 'POST':
        form = EmailUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            # changes the slug
            return redirect('profile')
    else:
        form = UserCreationForm()
    return render(request, "registration/register.html", {'form': form})

def profile(request):
    if not request.user.is_authenticated():
        return redirect('login')
    return render(request, 'account/profile.html', {})

