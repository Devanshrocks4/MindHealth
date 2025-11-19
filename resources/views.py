from django.shortcuts import render
from .models import Resource

def resources_view(request):
    resources = Resource.objects.all()
    return render(request, 'resources.html', {'resources': resources})
