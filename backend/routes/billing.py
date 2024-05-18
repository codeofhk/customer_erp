import sqlite3
from fastapi import APIRouter, Request

router = APIRouter() 

conn_products = sqlite3.connect('Products.db')
conn_billing = sqlite3.connect('billing.db')
	

@router.get('/billing/item/check')
async def billing_check(item : str):
	item  = [i[0] for i in conn_billing.execute('select name from Products where name like ? ',(item + '%',)).fetchall()] 
	return {'message':item}

@router.get('/billing/item/price')
async def billing_price(item : str):
	(id,price) = conn_billing.execute('select id,price from Products where name = ? ',(item,)).fetchone()
	return {'price':price,'id':id}

@router.post('/billing')
async def billing(request: Request):
	data = await request.json()
	print(data)
	billing_id = data["billing_id"]

	for i in data["items"]:
		conn_billing.execute('insert into billing_items(billing_id,product_id,quantity,unit_price,total_price) values (?,?,?,?,?)',(billing_id,i["id"],i["quantity"],i["price"],i["quantity"]*i["price"]))

	conn_billing.commit()

	return {'message':'Data received'}

@router.post('/billing/checkout')
async def billing_checkout(request: Request):
	data = await request.json()
	billing_id = data["billing_id"]
	conn_billing.execute('insert into billings(id,total_price) values (?,?)',(billing_id))
	conn_billing.commit()
	return {'message':'Data received'}
