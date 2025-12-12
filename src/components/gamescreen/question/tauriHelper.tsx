import { invoke } from '@tauri-apps/api/tauri';
// ...

export const fetchExternalImage = async (category: string, index: number): Promise<string> => {
    // Ścieżka relatywna, którą Rust połączy z katalogiem aplikacji
    const relativePath = `${category}/${index}.jpg`;

    // Zamiast zwracać URL, WYWOŁUJEMY funkcję Rust
    const base64DataUrl: string = await invoke('get_base64_image', {
        relativePath: `categories/${relativePath}` // Pełna ścieżka do folderu categories
    });

    // Rust zwraca ciąg Base64, który jest gotowy do wstawienia do <img>
    return base64DataUrl;
};
