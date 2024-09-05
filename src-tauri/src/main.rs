// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dezmostenireapopeascatauri_lib::testare_db;

use tokio;

/* OLD MAIN
fn main() {
    //dezmostenireapopeascatauri_lib::run()
}
*/

#[tokio::main]
async fn main() {
    testare_db().await;
}
