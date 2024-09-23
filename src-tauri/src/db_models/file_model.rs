use mongodb::bson::Bson;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

use super::CollectionChecker;

pub struct FileCollConf;

impl CollectionConfig for FileCollConf {
    fn collection_name() -> &'static str {
        "Files"
    }
}

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct File {
    _id: ObjectId,
    data: Bson,
}

impl Model for File {
    type CollConf = FileCollConf;
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct FileObjectId {
    id: ObjectId,
}

impl ToString for FileObjectId {
    fn to_string(&self) -> String {
        return self.id.to_string();
    }
}

impl CollectionChecker<FileObjectId, File> for FileObjectId {
    fn new_without_check(obj_id: ObjectId) -> FileObjectId {
        Self { id: obj_id }
    }
}
