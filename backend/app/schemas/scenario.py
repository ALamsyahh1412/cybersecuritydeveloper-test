
from datetime import date, datetime
from enum import Enum
from ipaddress import ip_address

from pydantic import BaseModel, Field, field_validator


class Difficulty(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"
    EXPERT = "Expert"


class ScenarioStatus(str, Enum):
    DRAFT = "Draft"
    REVIEW = "Review"
    RELEASED = "Released"


class ScenarioBase(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=200
    )

    description: str = Field(
        min_length=10
    )

    difficulty: Difficulty

    category: str = Field(
        min_length=2,
        max_length=100
    )

    status: ScenarioStatus = ScenarioStatus.DRAFT

    target_ip: str | None = None

    target_host: str | None = Field(
        default=None,
        max_length=255
    )

    arranged_date: date

    @field_validator("target_ip")
    @classmethod
    def validate_target_ip(cls, value):
        if value is None:
            return value

        try:
            ip_address(value)
        except ValueError:
            raise ValueError("target_ip must be a valid IP address")

        return value

    @field_validator("arranged_date")
    @classmethod
    def validate_arranged_date(cls, value):
        if value > date.today():
            raise ValueError(
                "arranged_date cannot be in the future"
            )

        return value


class ScenarioCreate(ScenarioBase):
    pass


class ScenarioUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=200
    )

    description: str | None = Field(
        default=None,
        min_length=10
    )

    difficulty: Difficulty | None = None

    category: str | None = Field(
        default=None,
        min_length=2,
        max_length=100
    )

    status: ScenarioStatus | None = None

    target_ip: str | None = None

    target_host: str | None = Field(
        default=None,
        max_length=255
    )

    arranged_date: date | None = None

    @field_validator("target_ip")
    @classmethod
    def validate_target_ip(cls, value):
        if value is None:
            return value

        try:
            ip_address(value)
        except ValueError:
            raise ValueError("target_ip must be a valid IP address")

        return value

    @field_validator("arranged_date")
    @classmethod
    def validate_arranged_date(cls, value):
        if value is None:
            return value

        if value > date.today():
            raise ValueError(
                "arranged_date cannot be in the future"
            )

        return value


class ScenarioResponse(ScenarioBase):
    id: int
    created_by: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class ScenarioListResponse(BaseModel):
    items: list[ScenarioResponse]
    total: int
    page: int
    limit: int
    total_pages: int