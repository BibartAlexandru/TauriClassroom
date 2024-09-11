use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ISubject {
    pub _id: String,
    pub name: String,
}
