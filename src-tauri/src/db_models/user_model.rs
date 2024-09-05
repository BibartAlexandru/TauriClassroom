use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub enum UserType {
    STUDENT,
    TEACHER,
    ADMIN,
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
    pub name: String,
    pub email: String,
    pub password: String,
    pub _type: UserType,
    pub img_id: String, // todo
    pub lansat: bool,
}

impl Model for User {
    type CollConf = UserCollConf;
}
