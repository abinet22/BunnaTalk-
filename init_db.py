# init_db.py
from app import create_app
from app.models import db  # Import db from models

app = create_app()

with app.app_context():
    db.create_all()  # Create all the tables defined in your models
    print("Database initialized and tables created.")
