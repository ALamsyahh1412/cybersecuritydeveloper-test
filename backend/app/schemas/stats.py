from pydantic import BaseModel


class SummaryResponse(BaseModel):
    total_scenarios: int
    draft: int
    expert: int
    released_today: int


class CategoryStatResponse(BaseModel):
    category: str
    count: int


class DifficultyStatResponse(BaseModel):
    difficulty: str
    count: int


class ReportResponse(BaseModel):
    category: str
    total: int
    expert: int
    advanced: int
    intermediate: int
    beginner: int
    published: int