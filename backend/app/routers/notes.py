from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user
from ..database import get_db
from ..models.note import Note
from ..models.scenario import Scenario
from ..schemas.note import NoteCreate, NoteResponse


router = APIRouter(
    prefix="/api/scenarios",
    tags=["Notes"]
)


@router.get(
    "/{scenario_id}/notes",
    response_model=list[NoteResponse]
)
def get_notes(
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

    notes = db.query(Note).filter(
        Note.scenario_id == scenario_id
    ).order_by(
        Note.created_at.asc()
    ).all()

    return notes


@router.post(
    "/{scenario_id}/notes",
    response_model=NoteResponse,
    status_code=status.HTTP_201_CREATED
)
def create_note(
    scenario_id: int,
    note_data: NoteCreate,
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

    note = Note(
        scenario_id=scenario_id,
        developer_id=current_user.id,
        content=note_data.content
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note