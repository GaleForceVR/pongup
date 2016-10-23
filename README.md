# PONGup

## Front End Tests

run the tests:
```
mocha --compilers js:babel-core/register pongup/static/js/browserify/pongup/test/
```

## PostgreSQL

start local postgres server:

```
pg_ctl -D /usr/local/var/postgres -l logfile start
```

open postgres in terminal:

```
python manage.py shell

# example code:
from ladders.models import Ladder, User_Ladder
from django.contrib.auth.models import User
from django.utils import timezone
ul = User_Ladder.objects.get(pk=2)
ul
```

create super user on heroku:

```
heroku run python manage.py createsuperuser
```

## heroku cli info:

https://devcenter.heroku.com/articles/heroku-postgresql#using-the-cli


# Heroku Django Starter Template

An utterly fantastic project starter template for Django 1.9.

## Features

- Production-ready configuration for Static Files, Database Settings, Gunicorn, etc.
- Enhancements to Django's static file serving functionality via WhiteNoise

## How to Use

To use this project, follow these steps:

1. Create your working environment.
2. Install Django (`$ pip install django`)
3. Create a new project using this template

## Creating Your Project

Using this template to create a new Django app is easy::

    $ django-admin.py startproject --template=https://github.com/heroku/heroku-django-template/archive/master.zip --name=Procfile helloworld

You can replace ``helloworld`` with your desired project name.

## Deployment to Heroku

    $ git init
    $ git add -A
    $ git commit -m "Initial commit"

    $ heroku create
    $ git push heroku master

    $ heroku run python manage.py migrate

## Further Reading

- [Gunicorn](https://warehouse.python.org/project/gunicorn/)
- [WhiteNoise](https://warehouse.python.org/project/whitenoise/)
- [dj-database-url](https://warehouse.python.org/project/dj-database-url/)
