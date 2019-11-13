from flask import url_for, request, Blueprint, jsonify, render_template
from flask_login import login_user, current_user, logout_user, login_required
from server import db, bcrypt
from models import User


users = Blueprint('users', __name__)

@users.route('/')
def home():
    return render_template('index.html')

@users.route('/register', methods=['POST'])
def register():
    requestJSON = request.get_json(silent=True)

    if current_user.is_authenticated:
        return jsonify(status='authenticated')
    else:
        hashed_password = bcrypt.generate_password_hash(requestJSON['password']).decode('utf-8')
        user = User(password=hashed_password, username=requestJSON['username'], email=requestJSON['email'])
        db.session.add(user)
        db.session.commit()
        return jsonify(status='ok')

@users.route('/login', methods=['POST'])
def login():
    requestJSON = request.get_json(silent=True)
    if current_user.is_authenticated:
        print('Already authenticated!')
        return jsonify(status='ok')
    else:
        user = User.query.filter_by(email=requestJSON['email']).first()

        if user and bcrypt.check_password_hash(user.password, requestJSON['password']):
            login_user(user)
            print('Logged in!')
            return jsonify(status='ok')
        else:
            return jsonify(status='error')

@users.route('/logout')
def logout():
    logout_user()
    return jsonify(status='ok')

@users.route('/account', methods=['GET'])
@login_required
def account():
    return jsonify(email=current_user.email, username=current_user.username)