from flask import Flask
from .models import db  # Import db from models
from .routes.main import main  # Import main blueprint
from .routes.user import user   # Import user blueprint
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(main)
    app.register_blueprint(user,url_prefix='/user')
    
    return app
