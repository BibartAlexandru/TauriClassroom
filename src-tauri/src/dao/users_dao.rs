use std::ops::Sub;

use crate::db_instance;

use super::super::db_instance::DbInstance;
use super::super::db_models::*;
use super::super::dto::*;
use futures::StreamExt;
use futures::TryStreamExt;
use mongodm::prelude::ObjectId;
use mongodm::ToRepository;
use mongodm::{doc, field};

pub async fn dao_get_users() -> Result<Vec<User>, String> {
    let db_instance = DbInstance::initialize().await;
    let repo = db_instance.db.repository::<User>();
    let users = repo
        .find(doc! {})
        .await
        .expect("Failed at retreiving users!");
    let res: Result<Vec<User>, mongodm::mongo::error::Error> = users.try_collect().await;
    match res {
        Ok(us) => return Ok(us),
        Err(e) => return Err(e.to_string()),
    }
}
