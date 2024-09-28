use serde::{Deserialize, Serialize};

use crate::dao::dao_get_courses;
use crate::db_models::Course;
use crate::TimePeriod;

#[derive(Debug, Serialize, Deserialize)]
pub struct ICourse {
    pub _id: String,
    pub subject_id: String,
    pub teacher_id: String,
    pub class_id: String,
    pub time_period: TimePeriod,
}

#[tauri::command]
pub async fn get_courses() -> (bool, Vec<ICourse>) {
    match dao_get_courses().await {
        Ok(res) => (
            true,
            res.into_iter()
                .map(|c| ICourse {
                    _id: c._id.to_string(),
                    subject_id: c.subject_id.to_string(),
                    teacher_id: c.teacher_id.to_string(),
                    class_id: c.class_id.to_string(),
                    time_period: c.time_period,
                })
                .collect(),
        ),
        Err(e) => {
            println!("{}", e);
            return (false, vec![]);
        }
    }
}

#[tauri::command]
pub async fn edit_course(course: ICourse) -> bool {
    todo!()
}

#[tauri::command]
pub async fn delete_course(obj_id: String) -> bool {
    todo!()
}
