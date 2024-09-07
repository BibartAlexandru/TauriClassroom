// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ISubject {
    pub _id: String,
    pub name: String,
}

#[tauri::command]
async fn get_subjects() -> Vec<ISubject> {
    let db_instance = DbInstance::new().await;
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
fn get_random_message(prev_message: &str) -> String {
    match prev_message {
        "THIS IS A RANDOM STRING!" => return String::from("THIS IS A PRANK!"),
        "THIS IS A PRANK!" => return String::from("THIS IS A RANDOM STRING!"),
        _ => return String::from("THIS IS A RANDOM STRING!"),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_random_message,
            get_subjects
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

mod db_instance;
mod db_models;
use chrono::DateTime;
use db_instance::*;
use db_models::*;
use db_models::{course_model::*, subject_model::*, user_model::*};
use futures::{FutureExt, StreamExt, TryStreamExt};
use mongodm::field;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

pub async fn testare_db() {
    let conn_str =
        "mongodb+srv://mateciuceduard69:J4CEJ3nPVhLxerUQ@fakeclassroom.x5tz5.mongodb.net/";
    let client = Client::with_uri_str(conn_str)
        .await
        .expect("Failed to establish database connection.");
    let db = client.database("TauriClassroom");
    sync_indexes::<UserCollConf>(&db)
        .await
        .expect("Failed to sync indexes.");
    sync_indexes::<SubjectCollConf>(&db)
        .await
        .expect("Failed to sync indexes.");
    sync_indexes::<CourseCollConf>(&db)
        .await
        .expect("Failed to sync indexes.");

    let repo = db.repository::<Subject>();
    let courses_repo = db.repository::<Course>();

    let subject = repo
        .find_one(doc! { field!(name in Subject): "NotExist"})
        .await
        .unwrap();

    //println!("{:?}", subject);
    let o_id = ObjectId::parse_str("66d9a695e5a15ce4ab9d4b19").unwrap();
    let a = SubjectObjectId::new(o_id, &repo).await.unwrap();

    println!("{:?}", a);

    // let curs = Course {
    //     subject_id: SubjectObjectId::new(subject.id, &repo).await.unwrap(),
    //     teacher_id: "".to_string(),
    //     class_id: ".".to_string(),
    //     time_period: TimePeriod::new(chrono::offset::Utc::now(), chrono::offset::Utc::now()),
    // };

    // courses_repo
    //     .insert_one(curs)
    //     .await
    //     .expect("FAILED AT ADDING COURSE");
}
