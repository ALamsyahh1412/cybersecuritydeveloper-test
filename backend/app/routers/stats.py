from datetime import date
import csv
import io

from fastapi import APIRouter, Depends, Query
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


def build_report(
    db: Session,
    date_from: date | None = None,
    date_to: date | None = None
):
    query = db.query(
        Scenario.category,
        Scenario.difficulty,
        Scenario.status,
        func.count(Scenario.id).label("count")
    )

    if date_from:
        query = query.filter(
            Scenario.arranged_date >= date_from
        )

    if date_to:
        query = query.filter(
            Scenario.arranged_date <= date_to
        )

    results = query.group_by(
        Scenario.category,
        Scenario.difficulty,
        Scenario.status
    ).all()

    report = {}

    for category, difficulty, status, count in results:
        if category not in report:
            report[category] = {
                "category": category,
                "total": 0,
                "expert": 0,
                "advanced": 0,
                "intermediate": 0,
                "beginner": 0,
                "published": 0,
            }

        report[category]["total"] += count

        difficulty_key = difficulty.lower()

        if difficulty_key in report[category]:
            report[category][difficulty_key] += count

        if status == "Released":
            report[category]["published"] += count

    return list(
        sorted(
            report.values(),
            key=lambda item: item["category"]
        )
    )


@router.get(
    "/report",
    response_model=list[ReportResponse]
)
def get_report(
    date_from: date | None = Query(
        default=None,
        description="Tanggal awal berdasarkan arranged_date"
    ),
    date_to: date | None = Query(
        default=None,
        description="Tanggal akhir berdasarkan arranged_date"
    ),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if date_from and date_to and date_from > date_to:
        return []

    return build_report(
        db=db,
        date_from=date_from,
        date_to=date_to
    )


@router.get("/report/csv")
def export_report_csv(
    date_from: date | None = Query(
        default=None,
        description="Tanggal awal berdasarkan arranged_date"
    ),
    date_to: date | None = Query(
        default=None,
        description="Tanggal akhir berdasarkan arranged_date"
    ),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if date_from and date_to and date_from > date_to:
        report = []
    else:
        report = build_report(
            db=db,
            date_from=date_from,
            date_to=date_to
        )

    output = io.StringIO()

    writer = csv.DictWriter(
        output,
        fieldnames=[
            "category",
            "total",
            "expert",
            "advanced",
            "intermediate",
            "beginner",
            "published",
        ]
    )

    writer.writeheader()

    for row in report:
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