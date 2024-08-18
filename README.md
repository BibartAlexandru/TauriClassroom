# Tauri + Angular

This template should help get you started developing with Tauri and Angular.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) + [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

- functiile din Rust trebuie anotate cu #[tauri::command] si puse in src/src-tauri/lib.rs
- trebuie dupa puse in generate_handler![]
- parametrii folosesc snake_case notation in Rust, dar cand ii trimiti din TypeScript prin invoke, trebuie sa folosesti camelCase. Ex:
  invoke<String>("get_random_message",{prevMessage : "MESSAGE"});
- Si in Rust semnatura functiei e fn get_random_message(prev_message: &str) -> String
