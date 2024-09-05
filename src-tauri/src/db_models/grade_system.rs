use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub enum GradeSystem {
    NUMERIC,
    LITERAL,
}

impl GradeSystem {
    pub fn get_grades(&self) -> Vec<String> {
        match self {
            GradeSystem::NUMERIC => (1..=10).map(|e| e.to_string()).collect(),
            GradeSystem::LITERAL => {
                vec![
                    "A".to_string(),
                    "B".to_string(),
                    "C".to_string(),
                    "D".to_string(),
                    "E".to_string(),
                    "F".to_string(),
                ]
            }
        }
    }
}
