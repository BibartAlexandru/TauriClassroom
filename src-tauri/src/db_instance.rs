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

pub struct DbInstance {
    pub client: Client,
    pub db: Database,
}

impl DbInstance {
    pub async fn new() -> Self {
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
