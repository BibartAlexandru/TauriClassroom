use crate::CourseObjectId;

use super::file_model::FileObjectId;
use super::grade_system::GradeSystem;
use super::post_model::Post;
use super::upload_model::UploadObjectId;
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
    pub post: Post,
    pub course_id: CourseObjectId,
    pub file_ids: Vec<FileObjectId>,
    pub upload_ids: Vec<UploadObjectId>,
    pub upload_restrictions: Vec<UploadRestriction>,
    pub grade_system: GradeSystem,
}

impl Model for Assignment {
    type CollConf = AssignmentCollConf;
}
