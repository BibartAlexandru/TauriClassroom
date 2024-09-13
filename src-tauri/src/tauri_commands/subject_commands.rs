use super::super::dao;
use crate::dto::ISubject;

#[tauri::command]
pub async fn get_subjects() -> Vec<ISubject> {
    return dao::dao_get_subjects().await;
}

#[tauri::command]
pub async fn update_subject_name(obj_id: String, new_name: String) -> bool {
    return dao::dao_update_subject_name(obj_id, new_name).await;
}

#[tauri::command]
pub async fn create_subject(name: String) -> (bool, String) {
    match dao::dao_create_subject(name).await {
        Some(id) => return (true, id.to_string()),
        None => return (false, "".to_string()),
    }
}
