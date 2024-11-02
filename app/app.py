# app/app.py

from flask import Flask

from config import Config

from models import db, User 
from routes import main, user  # Import both the main and user Blueprints


# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)  # Initialize db with the app


# Register the Blueprint
app.register_blueprint(main)
app.register_blueprint(user,url_prefix='/user')
    
# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True)
