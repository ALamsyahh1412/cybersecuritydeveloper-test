from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .models import User, Scenario, Note

from fastapi import Depends
from .auth.dependencies import get_current_user

from .routers.auth import router as auth_router
from .routers.scenarios import router as scenarios_router
from .routers.notes import router as notes_router
from .routers.stats import router as stats_router

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Cybersecurity Scenario Manager",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(scenarios_router)
app.include_router(notes_router)
app.include_router(stats_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {
        "message": "Cybersecurity Scenario Manager API"
    }


@app.get("/health/database")
def database_health():
    try:
        with engine.connect():
            return {
                "status": "ok",
                "database": "PostgreSQL"
            }

    except Exception as error:
        return {
            "status": "error",
            "detail": str(error)
        }

# @app.get("/api/test-protected")
# def protected_route(
#     token=Depends(get_current_user)
# ):
#     return {
#         "message": "You can access this protected route",
#         "token": token
#     }

@app.get("/api/test-protected")
def protected_route(
    current_user=Depends(get_current_user)
):
    return {
        "message": "You can access this protected route",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        }
    }