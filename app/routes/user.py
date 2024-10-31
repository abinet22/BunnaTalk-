# routes/user.py

from flask import Blueprint, render_template, session, redirect, url_for, flash
from ..models import db, User

# Define the user blueprint
user = Blueprint('user', __name__)

@user.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash('Please log in to access your dashboard.', 'error')
        return redirect(url_for('main.login'))
    return render_template('dashboard.html')

@user.route('/courses')
def courses():
    if 'user_id' not in session:
        flash('Please log in to view your courses.', 'error')
        return redirect(url_for('main.login'))
    return render_template('user/mycourses.html')
@user.route('/lessons')
def lessons():
    if 'user_id' not in session:
        flash('Please log in to view your courses.', 'error')
        return redirect(url_for('main.login'))
    return render_template('user/lessons.html')

@user.route('/community')
def community():
    if 'user_id' not in session:
        flash('Please log in to join the community.', 'error')
        return redirect(url_for('main.login'))
    return render_template('user/community.html')

@user.route('/resources')
def resources():
    if 'user_id' not in session:
        flash('Please log in to access resources.', 'error')
        return redirect(url_for('main.login'))
    return render_template('user/resources.html')
