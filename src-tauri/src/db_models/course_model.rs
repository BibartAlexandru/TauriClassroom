use super::subject_model::Subject;
use super::subject_model::SubjectObjectId;
use chrono::{DateTime, Utc};
use mongodm::{
    field,
    mongo::{
        bson::{doc, oid::ObjectId},
        options::ClientOptions,
        Client,
    },
};
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
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
    pub subject_id: SubjectObjectId,
    pub teacher_id: String, //todo
    pub class_id: String,   //todo
    pub time_period: TimePeriod,
}

impl Model for Course {
    type CollConf = CourseCollConf;
}
