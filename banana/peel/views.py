from django.shortcuts import render
from forms import UserProfileForm

# Create your views here.

def userView(request):
    text = "10 seconds to write a sentence! You have 5 seconds, 4, 3, 2, 1."
    # if this is a POST request, we need to process the form data
    if request.method == 'POST':
        #create a form instance and populate it with data from the request:
        form = UserProfileForm(request.POST)
        #check wheter it's valid:
        if form.is_valid():
            form.save()
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            # return render(request, 'index.html', {'form': form})

    # if a GET (or any other method) we'll create a blank form
    else:
        form = UserProfileForm()

    return render(request, 'index.html', {'form': form, 'text': text})