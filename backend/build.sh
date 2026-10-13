#!bin/bash
echo "script is executing !!!"
python manage.py migrate
python manage.py collectstatic --noinput
daphne -b 0.0.0.0 -p 8000 config.asgi:application
