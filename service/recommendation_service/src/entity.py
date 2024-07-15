from pydantic import ConfigDict, BaseModel, Field
from pydantic.functional_validators import BeforeValidator
from typing import Optional, List
from typing_extensions import Annotated

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]

class MovieMappingModel(BaseModel):
    """
    Container for a single student record.
    """

    # The primary key for the StudentModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses.
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    movie_id: int = Field(...)
    entity_id: int = Field(...)

class MovieMappingCollection(BaseModel):
    """
    A container holding a list of `MovieMappingModel` instances.
    """

    collection: List[MovieMappingModel]

class UserBehavior(BaseModel):
    """
    Container for a single UserBehavior record.
    """

    # The primary key for the StudentModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses.
    user_id: int = Field(...)
    movie_id: int = Field(...)

class UserBehaviorCollection(BaseModel):
    """
    A container holding a list of `UserBehavior` instances.
    """

    collection: List[UserBehavior]

class MovieRecommendationCollection(BaseModel):
    """
    A container holding a list of int instances.
    """

    data: List[int]