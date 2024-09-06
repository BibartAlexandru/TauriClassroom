use chrono::{DateTime, Utc};
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct MessageCollConf;

impl CollectionConfig for MessageCollConf {
    fn collection_name() -> &'static str {
        "Messages"
    }
}
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Message {
    pub _id: ObjectId,
    pub text: String,
    pub author_id: ObjectId,
    pub date: DateTime<Utc>,
    pub audio_file_id: ObjectId,
    pub replied_message_id: Option<ObjectId>,
}

impl Model for Message {
    type CollConf = MessageCollConf;
}
