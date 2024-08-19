# Tauri + Angular Project

Recommended software for code editing:

## [VS Code](https://code.visualstudio.com/)

Plugins:

- For Frontend: [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode), [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- For Backend: [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) , [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)

## Extra Stuff

- functiile din Rust trebuie anotate cu #[tauri::command] si puse in src/src-tauri/lib.rs
- trebuie dupa puse in generate_handler![]
- parametrii folosesc snake_case notation in Rust, dar cand ii trimiti din TypeScript prin invoke, trebuie sa folosesti camelCase. Ex:
  invoke<String>("get_random_message",{prevMessage : "MESSAGE"});
- Si in Rust semnatura functiei e fn get_random_message(prev_message: &str) -> String
