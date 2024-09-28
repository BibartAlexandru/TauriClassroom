use std::error::Error;
use std::fmt::Display;

use mongodm::field;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client, Collection};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

use super::CollectionChecker;

pub struct SubjectCollConf {}

impl CollectionConfig for SubjectCollConf {
    fn collection_name() -> &'static str {
        "Subjects"
    }
    fn indexes() -> Indexes {
        Indexes::new().with(Index::new("name").with_option(IndexOption::Unique))
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Subject {
    pub _id: ObjectId,
    pub name: String,
}

impl Model for Subject {
    type CollConf = SubjectCollConf;
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct SubjectObjectId {
    id: ObjectId,
}

impl ToString for SubjectObjectId {
    fn to_string(&self) -> String {
        return self.id.to_string();
    }
}

impl CollectionChecker<SubjectObjectId, Subject> for SubjectObjectId {
    fn new_without_check(obj_id: ObjectId) -> SubjectObjectId {
        Self { id: obj_id }
    }
}
