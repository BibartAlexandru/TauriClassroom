use super::db_models::course_model::*;
use super::db_models::subject_model::*;
use super::db_models::user_model::*;
use mongodb::Database;
use mongodm::field;
use mongodm::mongo::{bson::doc, options::ClientOptions, Client};
use mongodm::prelude::ObjectId;
use mongodm::{sync_indexes, CollectionConfig, Index, IndexOption, Indexes, Model, ToRepository};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;
use tokio::sync::{Mutex, OnceCell};

pub struct DbInstance {
    pub client: Client,
    pub db: Database,
}

impl DbInstance {
    //TODO MAKE SINGLETON
    // pub async fn new() -> &'static Mutex<DbInstance> {
    //     static INSTANCE: OnceCell<Mutex<DbInstance>> = OnceCell::const_new();
    //     INSTANCE.get_or_init(|| {
    //         let db_instance = tokio::runtime::Handle::current().block_on(DbInstance::initialize());
    //         Mutex::new(db_instance)
    //     })
    // }

    pub async fn initialize() -> DbInstance {
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
        Self { client, db }
    }
}
