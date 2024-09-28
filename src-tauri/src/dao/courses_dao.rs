use super::super::db_instance::DbInstance;
use super::super::db_models::*;
use super::super::dto::*;
use futures::TryStreamExt;
use mongodm::prelude::ObjectId;
use mongodm::ToRepository;
use mongodm::{doc, field};

pub async fn dao_get_courses() -> Result<Vec<Course>, String> {
    let instance = DbInstance::initialize().await;
    let courses_repo = instance.db.repository::<Course>();
    let res = courses_repo.find(doc! {}).await;
    match res {
        Ok(cursor) => {
            let courses = cursor.try_collect().await;
            match courses {
                Ok(actual_courses) => return Ok(actual_courses),
                Err(e) => return Err(e.to_string()),
            }
        }
        Err(e) => return Err(e.to_string()),
    }
}
