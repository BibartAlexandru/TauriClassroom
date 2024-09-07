use crate::CourseObjectId;

use super::post_model::Post;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::{In, ObjectId};
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct InfoCollConf {}

impl CollectionConfig for InfoCollConf {
    fn collection_name() -> &'static str {
        "Infos"
    }
}
#[derive(Serialize, Debug, Deserialize, PartialEq)]
pub struct Info {
    pub course_id: CourseObjectId,
    pub post: Post,
}

impl Model for Info {
    type CollConf = InfoCollConf;
}
