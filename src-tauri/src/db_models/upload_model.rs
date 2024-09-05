use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct UploadCollConf {}

impl CollectionConfig for UploadCollConf {
    fn collection_name() -> &'static str {
        "Uploads"
    }
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub struct Upload {
    pub id: ObjectId,
    pub file_ids: Vec<ObjectId>,
    pub user_ids: Vec<ObjectId>,
    pub grade: String,
}

impl Model for Upload {
    type CollConf = UploadCollConf;
}
