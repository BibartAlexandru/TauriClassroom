use mongodm::field;
use mongodm::mongo::{
    bson::{doc, Bson},
    options::ClientOptions,
    Client, Collection,
};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

use crate::StudentObjectId;

use super::CollectionChecker;

pub struct ClassCollConf;

impl CollectionConfig for ClassCollConf {
    fn collection_name() -> &'static str {
        "Classes"
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Class {
    _id: ObjectId,
    student_ids: Vec<StudentObjectId>,
}

impl Model for Class {
    type CollConf = ClassCollConf;
}

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct ClassObjectId {
    id: ObjectId,
}

impl CollectionChecker<ClassObjectId, Class> for ClassObjectId {
    fn new_without_check(obj_id: ObjectId) -> ClassObjectId {
        Self { id: obj_id }
    }
}
