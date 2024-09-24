use mongodm::prelude::ObjectId;
use serde::{Deserialize, Serialize};

use crate::dao::{dao_create_user, dao_delete_user, dao_edit_user, dao_get_users};
use crate::db_models::{User, UserType};
use crate::UserObjectId;
use std::vec;

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct IUser {
    pub _id: String,
    pub name: String,
    pub email: String,
    pub password: String,
    pub _type: UserType,
    pub img_id: String,
    pub lansat: bool,
}

#[tauri::command]
pub async fn get_users() -> (bool, Vec<IUser>) {
    match dao_get_users().await {
        Ok(users) => {
            return (
                true,
                users
                    .into_iter()
                    .map(|user| IUser {
                        _id: user._id.to_string(),
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        _type: user._type,
                        img_id: user.img_id.to_string(),
                        lansat: user.lansat,
                    })
                    .collect(),
            )
        }
        Err(e) => {
            println!("Error at getting users: {:?}", e);
            return (false, vec![]);
        }
    }
}

#[tauri::command]
pub async fn create_user(user: IUser) -> (bool, String) {
    match dao_create_user(user).await {
        Ok(created_obj_id) => return (true, created_obj_id.to_string()),
        Err(e) => {
            println!("{:?}", e);
            return (false, "".to_string());
        }
    }
}

#[tauri::command]
pub async fn edit_user(user: IUser) -> bool {
    match dao_edit_user(user).await {
        Ok(_) => true,
        Err(e) => {
            print!("{}", e);
            false
        }
    }
}

#[tauri::command]
pub async fn delte_user(obj_id: String) -> bool {
    match dao_delete_user(obj_id).await {
        Ok(_) => return true,
        Err(e) => {
            println!("{}", e);
            return false;
        }
    }
}
