from datetime import date
import csv
import io

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user
from ..database import get_db
from ..models.scenario import Scenario
from ..schemas.stats import (
    SummaryResponse,
    CategoryStatResponse,
    DifficultyStatResponse,
    ReportResponse,
)


router = APIRouter(
    prefix="/api/stats",
    tags=["Statistics"]
)


@router.get(
    "/summary",
    response_model=SummaryResponse
)
def get_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    total_scenarios = db.query(
        func.count(Scenario.id)
    ).scalar()

    draft = db.query(
        func.count(Scenario.id)
    ).filter(
        Scenario.status == "Draft"
    ).scalar()

    expert = db.query(
        func.count(Scenario.id)
    ).filter(
        Scenario.difficulty == "Expert"
    ).scalar()

    released_today = db.query(
        func.count(Scenario.id)
    ).filter(
        Scenario.status == "Released",
        Scenario.updated_at >= date.today()
    ).scalar()

    return {
        "total_scenarios": total_scenarios,
        "draft": draft,
        "expert": expert,
        "released_today": released_today,
    }


@router.get(
    "/by-category",
    response_model=list[CategoryStatResponse]
)
def get_by_category(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    results = db.query(
        Scenario.category,
        func.count(Scenario.id).label("count")
    ).group_by(
        Scenario.category
    ).order_by(
        Scenario.category
    ).all()

    return [
        {
            "category": category,
            "count": count
        }
        for category, count in results
    ]


@router.get(
    "/by-difficulty",
    response_model=list[DifficultyStatResponse]
)
def get_by_difficulty(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    results = db.query(
        Scenario.difficulty,
        func.count(Scenario.id).label("count")
    ).group_by(
        Scenario.difficulty
    ).order_by(
        Scenario.difficulty
    ).all()

    return [
        {
            "difficulty": difficulty,
            "count": count
        }
        for difficulty, count in results
    ]


@router.get(
    "/report",
    response_model=list[ReportResponse]
)
def get_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    results = db.query(
        Scenario.category,
        Scenario.difficulty,
        func.count(Scenario.id).label("count")
    ).group_by(
        Scenario.category,
        Scenario.difficulty
    ).all()

    report = {}

    for category, difficulty, count in results:
        if category not in report:
            report[category] = {
                "category": category,
                "easy": 0,
                "medium": 0,
                "hard": 0,
                "expert": 0,
            }

        difficulty_key = difficulty.lower()

        if difficulty_key in report[category]:
            report[category][difficulty_key] = count

    return list(report.values())

@router.get("/report/csv")
def export_report_csv(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    results = db.query(
        Scenario.category,
        Scenario.difficulty,
        func.count(Scenario.id).label("count")
    ).group_by(
        Scenario.category,
        Scenario.difficulty
    ).all()

    report = {}

    for category, difficulty, count in results:
        if category not in report:
            report[category] = {
                "category": category,
                "easy": 0,
                "medium": 0,
                "hard": 0,
                "expert": 0,
            }

        difficulty_key = difficulty.lower()

        if difficulty_key in report[category]:
            report[category][difficulty_key] = count

    output = io.StringIO()

    writer = csv.DictWriter(
        output,
        fieldnames=[
            "category",
            "easy",
            "medium",
            "hard",
            "expert"
        ]
    )

    writer.writeheader()

    for row in report.values():
        writer.writerow(row)

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
                "attachment; filename=scenario_report.csv"
        }
    )