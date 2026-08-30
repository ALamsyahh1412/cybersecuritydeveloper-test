from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.auth.security import hash_password


def create_admin():
    db: Session = SessionLocal()

    try:
        existing_user = db.query(User).filter(
            User.email == "admin@example.com"
        ).first()

        if existing_user:
            print("Admin user already exists.")
            return

        admin = User(
            name="Administrator",
            email="admin@example.com",
            password_hash=hash_password("Admin123!")
        )

        db.add(admin)
        db.commit()
        db.refresh(admin)

        print("Admin user created successfully.")
        print(f"ID: {admin.id}")
        print(f"Email: {admin.email}")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()