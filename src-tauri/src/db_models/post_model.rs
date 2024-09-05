// use super::*;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct PostCollConf {}

impl CollectionConfig for PostCollConf {
    fn collection_name() -> &'static str {
        "Posts"
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct Post {
    pub id: ObjectId,
    pub text: String,
    pub title: String,
    pub author_id: ObjectId, //todo
}

impl Model for Post {
    type CollConf = PostCollConf;
}

impl Post {
    pub fn new(
        //todo
        text: String,
        title: String,
        author_id: ObjectId,
    ) -> Result<Self, mongodm::mongo::error::Error> {
        Ok(Self {
            id: ObjectId::new(),
            text: text,
            title: title,
            author_id: author_id,
        })
    }
}
