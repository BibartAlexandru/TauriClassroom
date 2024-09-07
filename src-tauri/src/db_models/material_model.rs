use crate::CourseObjectId;

use super::file_model::FileObjectId;
use super::post_model::Post;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct MaterialCollConf {}

impl CollectionConfig for MaterialCollConf {
    fn collection_name() -> &'static str {
        "Materials"
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Material {
    pub course_id: CourseObjectId,
    pub file_ids: Vec<FileObjectId>,
    pub post: Post,
}

impl Model for Material {
    type CollConf = MaterialCollConf;
}
