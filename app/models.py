from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from flask_login import UserMixin
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(155), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    def is_active(self):
        return True  # Change this logic as necessary
    role = db.Column(db.String(50))
    email = db.Column(db.String(150), unique=True, nullable=False)
    learning_language = db.Column(db.String(50), nullable=True)
    progress = db.relationship('Progress', backref='user', lazy=True)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tasks = db.relationship('Task', backref='project', lazy=True)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    status = db.Column(db.String(50), default='pending')

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_number = db.Column(db.Integer, nullable=False)
    quiz_score = db.Column(db.Integer, nullable=True)
    completed = db.Column(db.Boolean, default=False)
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_paid = db.Column(db.Boolean, default=False)  # True if course is premium
    lessons = db.relationship('Lesson', backref='course', lazy=True)
class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    resources = db.relationship('Resource', backref='lesson', lazy=True)
class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), nullable=False)
    resource_type = db.Column(db.String(50), nullable=False)  # e.g., 'video', 'audio', 'document'
    resource_url = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
class Badge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    date_earned = db.Column(db.DateTime, nullable=False)
