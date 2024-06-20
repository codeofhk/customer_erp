from fastapi import APIRouter,Request
import sqlite3

router = APIRouter()

conn_billing = sqlite3.connect('billing.db')



@router.get('/sales/revenue')
async def revenue(request: Request):

    price_list = conn_billing.execute("select total_amount from billings where strftime('%m',date ) = '08'").fetchall()
    return {'message':'Sales revenue', 'value': round(sum(amount for amount, in price_list),2)}

@router.get('/sales/grossprofit')
async def grossProfit(request: Request):

    price_list = conn_billing.execute("select total_amount from billings where strftime('%m',date ) = '08'").fetchall()
    return {'message':'Sales revenue', 'value': round(0.6*sum(amount for amount, in price_list),2)}

@router.get('/sales/totalorders')
async def totalOrders(request: Request):

    total_sales = []

    for i in range(6):
        amount_list = conn_billing.execute(f'select total_amount from billings WHERE strftime("%m", date) = "0{9-i}" ').fetchall()
        total_sales.append({"label":f'{9-i}',"order":round(sum(amount for amount, in amount_list),2)})
    return {'message':'Total orders', 'value': total_sales}