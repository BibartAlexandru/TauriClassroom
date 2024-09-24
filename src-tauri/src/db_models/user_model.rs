use std::fmt::Display;

use super::file_model::FileObjectId;
use super::CollectionChecker;
use mongodm::field;
use mongodm::mongo::{
    bson::{doc, Bson},
    error::Error,
    options::ClientOptions,
    Client, Collection,
};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub enum UserType {
    STUDENT,
    TEACHER,
    ADMIN,
}

impl Display for UserType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

pub struct UserCollConf;

impl CollectionConfig for UserCollConf {
    fn collection_name() -> &'static str {
        "Users"
    }
    fn indexes() -> Indexes {
        Indexes::new().with(Index::new("email").with_option(IndexOption::Unique))
    }
}
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct User {
    #[serde(rename = "_id")]
    pub _id: ObjectId,
    pub name: String,
    pub email: String,
    pub password: String,
    pub _type: UserType,
    pub img_id: FileObjectId,
    pub lansat: bool,
}

impl Model for User {
    type CollConf = UserCollConf;
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct TeacherObjectId {
    id: ObjectId,
}

impl CollectionChecker<TeacherObjectId, User> for TeacherObjectId {
    fn new_without_check(obj_id: ObjectId) -> TeacherObjectId {
        Self { id: obj_id }
    }
    async fn new(obj_id: ObjectId, coll: &Collection<User>) -> Result<Self, String> {
        match coll
            .find_one(doc! {
            field!(_id in User): obj_id,
            field!(_type in User):"TEACHER"})
            .await
        {
            Ok(Some(_)) => {
                return Ok(Self::new_without_check(obj_id));
            }
            Ok(None) => return Err("No such teacher id:".to_string() + obj_id.to_string().as_str()),
            Err(e) => return Err(e.to_string()),
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct StudentObjectId {
    id: ObjectId,
}

impl CollectionChecker<StudentObjectId, User> for StudentObjectId {
    fn new_without_check(obj_id: ObjectId) -> StudentObjectId {
        Self { id: obj_id }
    }
    async fn new(obj_id: ObjectId, coll: &Collection<User>) -> Result<Self, String> {
        match coll
            .find_one(doc! {
            field!(_id in User): obj_id,
            field!(_type in User):"STUDENT"})
            .await
        {
            Ok(Some(_)) => {
                return Ok(Self::new_without_check(obj_id));
            }
            Ok(None) => return Err("No such student id:".to_string() + obj_id.to_string().as_str()),
            Err(e) => return Err(e.to_string()),
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct UserObjectId {
    id: ObjectId,
}

impl CollectionChecker<UserObjectId, User> for UserObjectId {
    fn new_without_check(obj_id: ObjectId) -> UserObjectId {
        Self { id: obj_id }
    }
}
