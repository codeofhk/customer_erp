import sqlite3
from fastapi import APIRouter, Request


router = APIRouter()

conn_billing = sqlite3.connect('billing.db')

@router.get('/billing/customer/check')
async def billing_customer_detail_check(contact : int):
    print(contact)
    customer = conn_billing.execute(f'select * from customers where phone_number like "%{contact}%"').fetchall()
    if(len(customer)==0):
        return {'customer':0 , 'message':'No customer found'}
    elif(len(customer)==1):
        return {'customer':1 , 'details':customer[-1]}
    else:
        return {'customer':len(customer), 'contact':[i[-1] for i in customer]}

@router.post('/billing/customer')
async def billing_customer(request: Request):
    data = await request.json()
    print(data)
    conn_billing.execute('insert into customers(name,phone_number,email,address) values (?,?,?,?)',(data["name"],data["phone_number"],data["email"],data["address"]))
    conn_billing.commit()
    return {'message':'Data received'}