use mongodm::{doc, field, mongo::Collection, prelude::ObjectId, Model};

pub mod assignment_model;
pub mod class_model;
pub mod comment_model;
pub mod course_model;
pub mod file_model;
pub mod grade_system;
pub mod info_model;
pub mod material_model;
pub mod message_model;
pub mod news_model;
pub mod post_model;
pub mod subject_model;
pub mod upload_model;
pub mod upload_restrictions;
pub mod user_model;

pub trait CollectionChecker<R, T>
where
    T: Model,
{
    fn new_without_check(obj_id: ObjectId) -> R;
    async fn new(obj_id: ObjectId, coll: &Collection<T>) -> Result<R, String> {
        match coll.find_one(doc! {"_id":obj_id}).await {
            Ok(Some(_)) => Ok(Self::new_without_check(obj_id)),
            Ok(None) => Err("No such id: ".to_string()
                + obj_id.to_string().as_str()
                + " for type "
                + std::any::type_name::<T>()),
            Err(e) => Err(e.to_string()),
        }
    }
}
