use super::class_model::ClassObjectId;
use super::subject_model::SubjectObjectId;
use super::user_model::TeacherObjectId;
use super::CollectionChecker;
use chrono::{DateTime, Utc};
use mongodm::{
    field,
    mongo::{
        bson::{doc, oid::ObjectId},
        options::ClientOptions,
        Client, Collection,
    },
};
use mongodm::{CollectionConfig, Index, Indexes, Model};
use serde::{Deserialize, Serialize};

pub struct CourseCollConf {}

impl CollectionConfig for CourseCollConf {
    fn indexes() -> Indexes {
        Indexes::new().with(Index::new("subject_id"))
    }

    fn collection_name() -> &'static str {
        "Courses"
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct TimePeriod {
    start: DateTime<Utc>,
    end: DateTime<Utc>,
}

impl TimePeriod {
    pub fn new(start: DateTime<Utc>, end: DateTime<Utc>) -> Self {
        Self {
            start: start,
            end: end,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Course {
    pub _id: ObjectId,
    pub subject_id: SubjectObjectId,
    pub teacher_id: TeacherObjectId,
    pub class_id: ClassObjectId,
    pub time_period: TimePeriod,
}

impl Model for Course {
    type CollConf = CourseCollConf;
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct CourseObjectId {
    id: ObjectId,
}

impl CollectionChecker<CourseObjectId, Course> for CourseObjectId {
    fn new_without_check(obj_id: ObjectId) -> CourseObjectId {
        Self { id: obj_id }
    }
}
