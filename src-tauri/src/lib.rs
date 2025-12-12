use tauri::Manager;
use std::env;
use std::fs;
use base64; // Wymaga dodania base64 = "0.21" do Cargo.toml

// --- KOMENDA 1: Odnajduje folder 'categories' (obok pliku .exe/.app) ---
#[tauri::command]
fn get_categories_dir() -> Result<String, String> {
    // 1. Uzyskanie ścieżki do pliku wykonywalnego
    let exe_path = env::current_exe().map_err(|e| format!("Błąd uzyskania ścieżki: {}", e))?;

    // 2. Uzyskanie katalogu, w którym znajduje się plik wykonywalny
    let exe_dir = exe_path.parent()
        .ok_or_else(|| "Błąd: Nie znaleziono katalogu nadrzędnego".to_string())?;

    // 3. Utworzenie pełnej ścieżki do folderu 'categories'
    // UWAGA: Rust szuka folderu categories OBOK pliku the-floor.app / app.exe
    let categories_dir = exe_dir.join("categories");

    // 4. Zwrócenie ścieżki jako String
    categories_dir.to_str()
        .map(|s| s.to_owned())
        .ok_or_else(|| "Błąd: Ścieżka zawiera niepoprawne znaki".to_string())
}


// --- KOMENDA 2: Wczytuje obraz i zwraca go jako Base64 Data URL ---
#[tauri::command]
fn get_base64_image(relative_path: String) -> Result<String, String> {
    // Używamy funkcji z pkt 1, aby uzyskać bazową ścieżkę do folderu 'categories'
    let base_dir = get_categories_dir()?;

    // Utworzenie pełnej ścieżki do pliku obrazu: [exe_dir]/categories/[relative_path]
    let full_path = std::path::PathBuf::from(base_dir).join(relative_path);

    if !full_path.exists() {
        // Jeśli plik nie istnieje, zwracamy błąd. Frontend użyje tego do zakończenia pojedynku.
        return Err(format!("Błąd: Nie znaleziono pliku w ścieżce: {}", full_path.display()));
    }

    // Odczyt pliku do bufora
    let bytes = fs::read(&full_path).map_err(|e| format!("Błąd odczytu pliku: {}", e))?;

    // Konwersja do Base64
    let base64_string = base64::encode(bytes);

    // Określenie typu MIME na podstawie rozszerzenia pliku
    let mime_type = match full_path.extension().and_then(|s| s.to_str()) {
        Some("png") => "image/png",
        Some("jpg") | Some("jpeg") => "image/jpeg",
        _ => "application/octet-stream",
    };

    // Zwrócenie gotowego ciągu Data URL: "data:image/png;base64,..."
    Ok(format!("data:{};base64,{}", mime_type, base64_string))
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    // REJESTRACJA NOWYCH KOMEND JEST TUTAJ
    .invoke_handler(tauri::generate_handler![get_categories_dir, get_base64_image])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
