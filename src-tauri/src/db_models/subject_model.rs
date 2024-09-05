use std::error::Error;

use mongodm::field;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client, Collection};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

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
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub name: String,
}

impl Model for Subject {
    type CollConf = SubjectCollConf;
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct SubjectObjectId {
    id: ObjectId,
}

impl SubjectObjectId {
    pub async fn new(
        obj_id: ObjectId,
        subject_collection: &Collection<Subject>,
    ) -> Result<Self, mongodm::mongo::error::Error> {
        match subject_collection
            .find_one(doc! { field!(id in Subject): obj_id})
            .await
        {
            Ok(_) => return Ok(Self { id: obj_id }),
            Err(e) => return Err(e),
        }
    }
}
