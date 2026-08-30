from datetime import date, timedelta

from app.schemas.scenario import (
    ScenarioCreate, Difficulty, ScenarioStatus
)
# from pydantic import ValidationError
from datetime import date, timedelta


# Test data valid
# scenario = ScenarioCreate(
#     title="SQL Injection Lab",
#     description="Practice identifying SQL injection vulnerabilities.",
#     difficulty="Medium",
#     category="Web Security",
#     status="Draft",
#     target_ip="192.168.1.10",
#     target_host="web-server",
#     arranged_date=date.today(),
# )
# scenario = ScenarioCreate(
#     title="SQL Injection Lab",
#     description="Practice identifying SQL injection vulnerabilities.",
#     difficulty="Very Hard",
#     category="Web Security",
#     status="Draft",
#     target_ip="192.168.1.10",
#     target_host="web-server",
#     arranged_date=date.today(),
# )

# print("VALID DATA")
# print(scenario)
# print("INVALID DATA")
# print(scenario2)
# invalid_scenario = ScenarioCreate(
#     title="SQL Injection Lab",
#     description="Practice identifying SQL injection vulnerabilities.",
#     difficulty="Medium",
#     category="Web Security",
#     status="Draft",
#     target_ip="999.999.999.999",
#     target_host="web-server",
#     arranged_date=date.today(),
# )

# print(invalid_scenario)

# try:
#     invalid_scenario = ScenarioCreate(
#         title="SQL Injection Lab",
#         description="Practice identifying SQL injection vulnerabilities.",
#         difficulty=Difficulty.MEDIUM,
#         category="Web Security",
#         status=ScenarioStatus.DRAFT,
#         target_ip="999.999.999.999",
#         target_host="web-server",
#         arranged_date=date.today(),
#     )

#     print("INVALID DATA ACCEPTED ❌")
#     print(invalid_scenario)

# except ValidationError as e:
#     print("INVALID DATA REJECTED ✅")
#     print(e)



future_date = date.today() + timedelta(days=1)

invalid_scenario = ScenarioCreate(
    title="SQL Injection Lab",
    description="Practice identifying SQL injection vulnerabilities.",
    difficulty="Medium",
    category="Web Security",
    status="Draft",
    target_ip="192.168.1.10",
    target_host="web-server",
    arranged_date=future_date,
)

print(invalid_scenario)

