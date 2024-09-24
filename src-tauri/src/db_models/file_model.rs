use mongodb::bson::{Bson, Document};
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

impl From<Bson> for FileObjectId {
    fn from(value: Bson) -> Self {
        match &value {
            Bson::Document(doc) => {
                if doc.contains_key("id") && doc.len() == 1 {
                    FileObjectId {
                        id: doc.get("id").unwrap().as_object_id().unwrap(),
                    }
                } else {
                    panic!("Could not convert Bson to FileObjectId: {:?}", value)
                }
            }
            _ => panic!("Could not convert Bson to FileObjectId: {:?}", value),
        }
    }
}

impl Into<Bson> for FileObjectId {
    fn into(self) -> Bson {
        let mut doc = Document::new();
        doc.insert("id", Bson::ObjectId(self.id));
        Bson::Document(doc)
    }
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
