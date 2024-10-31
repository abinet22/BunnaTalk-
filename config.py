# config.py

import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:R1445o123/@localhost/my_flask_app'  # Replace with your credentials
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_unique_secret_key'
