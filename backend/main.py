from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.billing import router as billing_router
from routes.login import router as login_router
from routes.customer import router as customer_router

app = FastAPI()

origins = [
"http://localhost:3000"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins = origins,
	allow_methods = ["*"],
	allow_credentials = True,
	allow_headers = ["*"]
)

app.include_router(billing_router, prefix='/api')
app.include_router(login_router, prefix='/api')
app.include_router(customer_router, prefix='/api')