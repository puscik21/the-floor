import {notifyError} from "../toast/notifier.tsx";

/**
 * Generic method for fetching JSON files with error notifications
 */
export const fetchJson = async <T>(path: string, fallbackValue: T): Promise<T> => {
    try {
        // Date.now() - to omit browser's cache (cache busting)
        const response = await fetch(`${path}?t=${Date.now()}`);
        if (!response.ok) {
            notifyError(`Błąd podczas ładowania ${path}: status ${response.status}`)
            return fallbackValue;
        }
        return await response.json() as T;
    } catch (error) {
        notifyError(`Nie udało się załadować ${path}`, error)
        return fallbackValue;
    }
}
