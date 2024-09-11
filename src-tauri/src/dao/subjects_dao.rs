use crate::db_instance;

use super::super::db_instance::DbInstance;
use super::super::db_models::*;
use super::super::dto::*;
use futures::TryStreamExt;
use mongodm::prelude::ObjectId;
use mongodm::ToRepository;
use mongodm::{doc, field};

#[tauri::command]
pub async fn get_subjects() -> Vec<ISubject> {
    let db_instance = DbInstance::initialize().await;
    let subjects_repo = db_instance.db.repository::<Subject>();
    let subjects = subjects_repo
        .find(doc! {})
        .await
        .expect("FAILED AT FINDING SUBJECTS");
    let subjects: Vec<Subject> = subjects.try_collect().await.unwrap();
    let subjects: Vec<ISubject> = subjects
        .into_iter()
        .map(|s| ISubject {
            _id: s._id.to_string(),
            name: s.name,
        })
        .collect();
    subjects
}

#[tauri::command]
pub async fn update_subject_name(obj_id: String, new_name: String) -> bool {
    let db_instance = DbInstance::initialize().await;
    let subjects_repo = db_instance.db.repository::<Subject>();
    let id_res = ObjectId::parse_str(obj_id);
    let mut id: ObjectId = ObjectId::new();
    let ok = match id_res {
        Ok(result) => {
            id = result;
            true
        }
        Err(e) => {
            println!("Function update_subject_name failed. ObjectId argument is invalid.");
            println!("{:?}", e);
            false
        }
    };
    if !ok {
        return false;
    }
    let res = subjects_repo
        .find_one_and_update(
            doc! {field!(_id in Subject): id},
            doc! {"$set": {field!(name in Subject):new_name}},
        )
        .await;
    let ok = match res {
        Ok(_) => true,
        Err(e) => {
            println!("Function update_subject_name failed at find_and_update");
            println!("{:?}", e);
            false
        }
    };
    ok
}
