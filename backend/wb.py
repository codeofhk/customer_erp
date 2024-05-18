import sqlite3
import random

conn_billing = sqlite3.connect('billing.db')
cursor = conn_billing.cursor()


customer = [i for i in cursor.execute('SELECT * FROM customers')]

for i in range(100):
    phone_number = int(''.join(random.choices('123456789', k=10)))
    cursor.execute("update customers set phone_number = ? where id = ? ", (phone_number,i+1))

conn_billing.commit()