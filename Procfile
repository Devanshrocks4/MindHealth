release: python manage.py collectstatic --noinput
web: gunicorn mental_health_php.wsgi:application --log-file -
