# routes/__init__.py

from flask import Blueprint
from .main  import main  # Import the main blueprint
from .user import user   # Import the user blueprint

# Export blueprints for easy import in the app factory
__all__ = ["main", "user"]
