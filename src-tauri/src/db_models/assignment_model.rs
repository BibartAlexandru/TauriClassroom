use super::grade_system::GradeSystem;
use super::upload_restrictions::UploadRestriction;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct AssignmentCollConf {}

impl CollectionConfig for AssignmentCollConf {
    fn collection_name() -> &'static str {
        "Assignments"
    }
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub struct Assignment {
    pub course_id: ObjectId,
    pub file_ids: Vec<ObjectId>,
    pub upload_ids: Vec<ObjectId>,
    pub upload_restrictions: Vec<UploadRestriction>,
    pub grade_system: GradeSystem,
}

impl Model for Assignment {
    type CollConf = AssignmentCollConf;
}
