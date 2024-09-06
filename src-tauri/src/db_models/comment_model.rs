use chrono::Utc;
use mongodb::bson::DateTime;
use mongodm::{prelude::ObjectId, CollectionConfig};
use mongodm::{sync_indexes, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct CommentCollConf {}

impl CollectionConfig for CommentCollConf {
    fn collection_name() -> &'static str {
        "Comments"
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Comment {
    _id: ObjectId,
    author_id: ObjectId,
    text: String,
    date: DateTime,
}

impl Model for Comment {
    type CollConf = CommentCollConf;
}
