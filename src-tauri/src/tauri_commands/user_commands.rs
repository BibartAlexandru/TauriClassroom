use serde::{Deserialize, Serialize};

use crate::dao::dao_get_users;
use crate::db_models::{User, UserType};
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
