# routes/user.py

from flask import Blueprint, render_template, session, redirect, url_for, flash,request, jsonify
from flask_login import current_user
from ..models import db, User

# Define the user blueprint
user = Blueprint('user', __name__)



@user.route('/courses')
def courses():
    if 'user_id' not in session:
        flash('Please log in to view your courses.', 'error')
        return redirect(url_for('main.login'))
    return render_template('user/mycourses.html')
@user.route('/currentlearn')
def currentlearn():
    return render_template('user/currentlearn.html')

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

@user.route('/update_learning_language', methods=['POST'])
def update_learning_language():
    if not current_user.is_authenticated:
        flash('Unauthorized access.', 'error')
        return redirect(url_for('main.dashboard'))  # Redirect to a safe page

    data = request.get_json()
    learning_language = data.get('learning_language')

    if not learning_language:
        flash('No language provided.', 'error')
        return redirect(url_for('main.dashboard'))  # Redirect to a safe page

    current_user.learning_language = learning_language
    db.session.commit()
    
    flash('Learning language updated successfully!', 'success')
    return redirect(url_for('main.dashboard'))  # Redirect to the dashboard