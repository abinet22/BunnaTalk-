from flask import Blueprint, render_template, request, redirect, url_for, flash,jsonify,session
from flask_login import login_required, current_user, login_user, logout_user
from ..models import db, User

# Define the blueprint
main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('home.html')
@main.route('/learning')
def learn():
    return render_template('learn.html')

@main.route('/features')
def features():
    return render_template('features.html')  # Create a corresponding features.html template

@main.route('/community')
def community():
    return render_template('community.html')  # Create a corresponding community.html template

@main.route('/courses')
def courses():
    return render_template('courses.html')  # Create a corresponding courses.html template

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user and user.verify_password(password):
            flash('Login successful!', 'success')
            login_user(user)
            return redirect(url_for('main.dashboard'))
        else:
            flash('Invalid credentials. Please try again.', 'error')

    return render_template('login.html')

@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()  # Get JSON data from the request
        name = data.get('name')
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        # Check if the user already exists
        existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
        if existing_user:
            return jsonify({'message': 'Email or username already registered.'}), 400

        # Create a new user and add to the database
        new_user = User(name=name, email=email, username=username)
        new_user.set_password(password)  # Assuming you have a method to hash the password
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Registration successful!'}), 201

    return render_template('register.html')
@main.route('/dashboard')
@login_required  # Automatically checks if user is authenticated
def dashboard():
    print("Current User:", current_user)
    return render_template('dashboard.html', user=current_user)
@main.route('/logout')
@login_required
def logout():
    logout_user()  # This clears the user session
    flash('You have been logged out successfully.', 'success')
    return redirect(url_for('main.home'))