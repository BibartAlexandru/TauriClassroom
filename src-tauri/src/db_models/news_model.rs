use super::post_model::Post;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};

pub struct NewsCollConf;

impl CollectionConfig for NewsCollConf {
    fn collection_name() -> &'static str {
        "News"
    }
}
#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct News {
    pub post: Post,
    pub links: Vec<String>,
}

impl Model for News {
    type CollConf = NewsCollConf;
}
