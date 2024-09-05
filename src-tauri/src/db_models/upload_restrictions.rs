use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct UploadRestriction {
    pub file_type: String,
    pub max_quantity: u32,
}
