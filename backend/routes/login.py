from pydantic import BaseModel
import sqlite3
import bcrypt
import jwt
from datetime import datetime,timedelta
from fastapi import APIRouter

router = APIRouter()

conn_users = sqlite3.connect('users.db')
conn_billing = sqlite3.connect('billing.db')

SECRET_KEY = 'secretkey'


class Item(BaseModel):
	username : str
	password : str


 # Function to generate JWT token
def generate_token(username: str) -> str:
    payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

@router.post('/billing/login')
async def home(item : Item):
	print('login')
	hashed_password = bcrypt.hashpw(item.password.encode('utf-8'), bcrypt.gensalt(10))

	conn = sqlite3.connect('users.db')
	cursor = conn.cursor()
	password_from_db = cursor.execute('select password from user where username = ?',(item.username,)).fetchone()

	if(password_from_db is None):
		return {'token':'','message':'User not found'}
	else:
		if bcrypt.checkpw(item.password.encode('utf-8'), password_from_db[0]):
			token = generate_token(item.username)
			return {'token':token,'message':'Login successful','billing_no': conn_billing.execute('''select id from billings order by id desc limit 1''').fetchone()[0]+1} 
		else:
			return {'token':'','message':'Invalid password'}	
	