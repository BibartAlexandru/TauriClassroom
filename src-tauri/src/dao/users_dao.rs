use std::ops::Sub;

use crate::db_instance;
use crate::IUser;

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

pub async fn dao_create_user(user: IUser) -> Result<ObjectId, String> {
    let instance = DbInstance::initialize().await;
    let users_repo = instance.db.repository::<User>();
    let files_repo = instance.db.repository::<File>();

    let img_obj_id: ObjectId;
    let ok = ObjectId::parse_str(user.img_id);
    match ok {
        Ok(oid) => img_obj_id = oid,
        Err(e) => return Err(e.to_string()),
    }
    let ok = FileObjectId::new(img_obj_id, &files_repo).await;
    let img_obj_id: FileObjectId;
    match ok {
        Ok(f) => img_obj_id = f,
        Err(e) => return Err(e),
    }
    let to_insert: User = User {
        _id: ObjectId::new(),
        name: user.name,
        email: user.email,
        password: user.password,
        _type: user._type,
        img_id: img_obj_id,
        lansat: user.lansat,
    };
    let ok = users_repo.insert_one(&to_insert).await;
    match ok {
        Ok(_) => return Ok(to_insert._id),
        Err(e) => return Err(e.to_string()),
    }
}

pub async fn dao_delete_user(obj_id: String) -> Result<(), String> {
    let instance = DbInstance::initialize().await;
    let repo = instance.db.repository::<User>();
    let actual_id: ObjectId;
    match ObjectId::parse_str(obj_id) {
        Ok(res) => actual_id = res,
        Err(e) => return Err(e.to_string()),
    }
    let ok = repo
        .find_one_and_delete(doc! {field!(_id in User): actual_id})
        .await;
    match ok {
        Ok(_) => return Ok(()),
        Err(e) => return Err(e.to_string()),
    }
}

pub async fn dao_edit_user(user: IUser) -> Result<(), String> {
    let instance = DbInstance::initialize().await;
    let users_repo = instance.db.repository::<User>();
    let files_repo = instance.db.repository::<File>();

    let user_id: ObjectId;
    if let Ok(id) = ObjectId::parse_str(user._id) {
        user_id = id;
    } else {
        return Err(String::from("User id cannot be parsed as an ObjectId"));
    }

    let img_id: ObjectId;
    match ObjectId::parse_str(user.img_id) {
        Ok(res) => img_id = res,
        Err(e) => return Err(e.to_string()),
    }
    let ok = FileObjectId::new(img_id, &files_repo).await;
    let img_id: FileObjectId;
    match ok {
        Ok(res) => img_id = res,
        Err(e) => return Err(e.to_string()),
    }

    let actual_user = User {
        _id: user_id,
        name: user.name,
        email: user.email,
        password: user.password,
        _type: user._type,
        img_id: img_id,
        lansat: user.lansat,
    };
    let ok = users_repo
        .find_one_and_update(
            doc! {field!(_id in User): actual_user._id},
            doc! {
                "$set": {field!(name in User): actual_user.name},
                "$set": {field!(email in User): actual_user.email},
                "$set": {field!(password in User): actual_user.password},
                "$set": {field!(_type in User): actual_user._type.to_string()},
                "$set": {field!(img_id in User): actual_user.img_id},
                "$set": {field!(lansat in User): actual_user.lansat},
            },
        )
        .await;
    match ok {
        Ok(_) => return Ok(()),
        Err(e) => return Err(e.to_string()),
    }
}
