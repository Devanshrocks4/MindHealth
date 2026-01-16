import os
import sys

# Add the project directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mental_health_php.settings')

# Import Django and setup
import django
django.setup()

# Import the WSGI application
from mental_health_php.wsgi import application as app
