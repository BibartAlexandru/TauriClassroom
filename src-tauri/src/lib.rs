// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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
        .invoke_handler(tauri::generate_handler![greet, get_random_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
