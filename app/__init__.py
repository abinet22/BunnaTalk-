from flask import Flask
from flask_login import LoginManager
from .models import db, User
from .routes.main import main  # Import main blueprint
from .routes.user import user   # Import user blueprint
from config import Config
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    
    login_manager.init_app(app)  # Initialize LoginManager here

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Optionally set the login_view for redirecting unauthenticated users
    login_manager.login_view = 'main.login'
    # Register blueprints
    app.register_blueprint(main)
    app.register_blueprint(user,url_prefix='/user')
    
    return app
