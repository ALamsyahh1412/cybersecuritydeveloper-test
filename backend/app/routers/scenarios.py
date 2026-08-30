# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from ..auth.dependencies import get_current_user
# from ..database import get_db
# from ..models.scenario import Scenario
# from ..schemas.scenario import ScenarioResponse


# router = APIRouter(
#     prefix="/api/scenarios",
#     tags=["Scenarios"]
# )


# @router.get(
#     "",
#     response_model=list[ScenarioResponse]
# )
# def get_scenarios(
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):
#     scenarios = db.query(Scenario).all()

#     return scenarios

# update


# from fastapi import APIRouter, Depends, HTTPException, status
# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session

# from ..auth.dependencies import get_current_user
# from ..database import get_db
# from ..models.scenario import Scenario
# from ..schemas.scenario import (
#     ScenarioCreate,
#     ScenarioUpdate,
#     ScenarioResponse,
# )
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_, cast, String
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user
from ..database import get_db
from ..models.scenario import Scenario
from ..schemas.scenario import (
    ScenarioCreate,
    ScenarioUpdate,
    ScenarioResponse,
    ScenarioListResponse,
)

router = APIRouter(
    prefix="/api/scenarios",
    tags=["Scenarios"]
)


# @router.get(
#     "",
#     response_model=list[ScenarioResponse]
# )
# def get_scenarios(
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):
#     scenarios = db.query(Scenario).all()

#     return scenarios
@router.get(
    "",
    response_model=ScenarioListResponse
)
def get_scenarios(
    search: str | None = Query(
        default=None,
        description="Search berdasarkan judul atau ID scenario"
    ),
    difficulty: str | None = Query(
        default=None,
        description="Filter berdasarkan difficulty"
    ),
    status_filter: str | None = Query(
        default=None,
        alias="status",
        description="Filter berdasarkan status"
    ),
    category: str | None = Query(
        default=None,
        description="Filter berdasarkan kategori"
    ),
    date_from: date | None = Query(
        default=None,
        description="Filter tanggal mulai"
    ),
    date_to: date | None = Query(
        default=None,
        description="Filter tanggal sampai"
    ),
    page: int = Query(
        default=1,
        ge=1,
        description="Nomor halaman"
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100,
        description="Jumlah data per halaman"
    ),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    query = db.query(Scenario)

    # Search berdasarkan judul atau ID
    if search:
        search = search.strip()

        query = query.filter(
            or_(
                Scenario.title.ilike(f"%{search}%"),
                cast(Scenario.id, String).ilike(f"%{search}%")
            )
        )

    # Filter difficulty
    if difficulty:
        query = query.filter(
            Scenario.difficulty.ilike(difficulty)
        )

    # Filter status
    if status_filter:
        query = query.filter(
            Scenario.status.ilike(status_filter)
        )

    # Filter category
    if category:
        query = query.filter(
            Scenario.category.ilike(f"%{category}%")
        )

    # Filter tanggal mulai
    if date_from:
        query = query.filter(
            Scenario.arranged_date >= date_from
        )

    # Filter tanggal sampai
    if date_to:
        query = query.filter(
            Scenario.arranged_date <= date_to
        )

    # Total data setelah filter
    total = query.count()

    # Pagination
    offset = (page - 1) * limit

    scenarios = query.order_by(
        Scenario.created_at.desc()
    ).offset(
        offset
    ).limit(
        limit
    ).all()

    total_pages = (total + limit - 1) // limit

    return {
        "items": scenarios,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }

@router.post(
    "",
    response_model=ScenarioResponse,
    status_code=status.HTTP_201_CREATED
)
def create_scenario(
    scenario_data: ScenarioCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    scenario = Scenario(
        title=scenario_data.title,
        description=scenario_data.description,
        difficulty=scenario_data.difficulty.value,
        category=scenario_data.category,
        status=scenario_data.status.value,
        target_ip=scenario_data.target_ip,
        target_host=scenario_data.target_host,
        arranged_date=scenario_data.arranged_date,
        created_by=current_user.id,
    )

    db.add(scenario)
    db.commit()
    db.refresh(scenario)

    return scenario

@router.get(
    "/{scenario_id}",
    response_model=ScenarioResponse
)
def get_scenario(
    scenario_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    scenario = db.query(Scenario).filter(
        Scenario.id == scenario_id
    ).first()

    if scenario is None:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    return scenario

@router.put(
    "/{scenario_id}",
    response_model=ScenarioResponse
)
def update_scenario(
    scenario_id: int,
    scenario_data: ScenarioUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    scenario = db.query(Scenario).filter(
        Scenario.id == scenario_id
    ).first()

    if scenario is None:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    update_data = scenario_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        if hasattr(value, "value"):
            value = value.value

        setattr(scenario, field, value)

    db.commit()
    db.refresh(scenario)

    return scenario

@router.delete(
    "/{scenario_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_scenario(
    scenario_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    scenario = db.query(Scenario).filter(
        Scenario.id == scenario_id
    ).first()

    if scenario is None:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    db.delete(scenario)
    db.commit()

    return None