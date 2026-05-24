from .base import *
import os
import dj_database_url



db_url=os.getenv('DATABASE_URL')
assert db_url, 'DATABASE URL IS MISSING'
DATABASES={
        'default':dj_database_url.parse(db_url)
        }
