use chrono::{DateTime, Utc};
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

use crate::UserObjectId;

use super::file_model::FileObjectId;
use super::CollectionChecker;

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
    pub author_id: UserObjectId,
    pub date: DateTime<Utc>,
    pub audio_file_id: FileObjectId,
    pub replied_message_id: Option<MessageObjectId>,
}

impl Model for Message {
    type CollConf = MessageCollConf;
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MessageObjectId {
    id: ObjectId,
}

impl CollectionChecker<MessageObjectId, Message> for MessageObjectId {
    fn new_without_check(obj_id: ObjectId) -> MessageObjectId {
        Self { id: obj_id }
    }
}
