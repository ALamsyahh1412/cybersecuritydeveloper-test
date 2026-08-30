from datetime import datetime

from pydantic import BaseModel, Field


class NoteCreate(BaseModel):
    content: str = Field(
        min_length=1,
        max_length=2000
    )


class NoteResponse(BaseModel):
    id: int
    scenario_id: int
    developer_id: int
    content: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }