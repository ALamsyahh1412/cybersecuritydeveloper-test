from datetime import date

from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.models.scenario import Scenario
from app.models.note import Note


def seed_data():
    db: Session = SessionLocal()

    try:
        admin = db.query(User).filter(
            User.email == "admin@example.com"
        ).first()

        if not admin:
            print("Admin user belum ada.")
            print("Jalankan terlebih dahulu: python create_admin.py")
            return

        scenarios = [
            {
                "title": "SQL Injection Detection",
                "description": "Identify and analyze a SQL injection vulnerability in a web application.",
                "difficulty": "Easy",
                "category": "Web Security",
                "status": "Released",
                "target_ip": "192.168.1.10",
                "target_host": "web-server.local",
                "arranged_date": date(2026, 8, 1),
            },
            {
                "title": "Brute Force SSH Attack",
                "description": "Analyze suspicious SSH authentication attempts and identify a possible brute force attack.",
                "difficulty": "Medium",
                "category": "Network Security",
                "status": "Released",
                "target_ip": "192.168.1.20",
                "target_host": "ssh-server.local",
                "arranged_date": date(2026, 8, 5),
            },
            {
                "title": "XSS Vulnerability Analysis",
                "description": "Analyze a reflected cross-site scripting vulnerability in a web application.",
                "difficulty": "Medium",
                "category": "Web Security",
                "status": "Review",
                "target_ip": "192.168.1.11",
                "target_host": "web-app.local",
                "arranged_date": date(2026, 8, 10),
            },
            {
                "title": "Privilege Escalation Investigation",
                "description": "Investigate a potential privilege escalation attack on a Linux server.",
                "difficulty": "Hard",
                "category": "System Security",
                "status": "Draft",
                "target_ip": "192.168.1.30",
                "target_host": "linux-server.local",
                "arranged_date": date(2026, 8, 12),
            },
            {
                "title": "Malware Traffic Analysis",
                "description": "Analyze network traffic to identify communication associated with malware.",
                "difficulty": "Expert",
                "category": "Malware Analysis",
                "status": "Released",
                "target_ip": "192.168.1.40",
                "target_host": "analysis-server.local",
                "arranged_date": date(2026, 8, 15),
            },
        ]

        created_count = 0

        for data in scenarios:
            existing = db.query(Scenario).filter(
                Scenario.title == data["title"]
            ).first()

            if existing:
                continue

            scenario = Scenario(
                **data,
                created_by=admin.id
            )

            db.add(scenario)
            db.flush()

            note = Note(
                scenario_id=scenario.id,
                developer_id=admin.id,
                content="Sample developer note for this cybersecurity scenario."
            )

            db.add(note)

            created_count += 1

        db.commit()

        print(f"Seed berhasil. {created_count} scenario baru ditambahkan.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
