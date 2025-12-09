/**
 * Sprawdza, czy plik pod daną ścieżką istnieje w publicznym katalogu.
 * @param url Ścieżka URL do obrazu (np. /categories/Informatyka/5.jpg)
 * @returns Promise<boolean> - true jeśli plik się załaduje, false w przeciwnym razie.
 */
const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true); // Załadowany pomyślnie
        img.onerror = () => resolve(false); // Błąd ładowania (pliku nie ma)
        img.src = url;
    });
};

// useGameDuelState.ts
// ... (inne importy i stan)

const [questionId, setQuestionId] = useState(1);
const [isCheckingNextQuestion, setIsCheckingNextQuestion] = useState(false); // Blokada, żeby nie zwiększać ID podczas sprawdzania

// Nowa funkcja sprawdzająca i przełączająca pytanie
const tryAdvanceQuestion = useCallback(async (currentId: number, currentCategory: string) => {
    if (isCheckingNextQuestion) return;
    setIsCheckingNextQuestion(true);

    const nextId = currentId + 1;
    const nextImageUrl = getImageFromCategory(currentCategory, nextId);

    // Sprawdzamy, czy następne zdjęcie fizycznie istnieje w folderze dystrybucyjnym
    const exists = await checkImageExists(nextImageUrl);

    if (exists) {
        // Zdjecie istnieje - przechodzimy do niego
        setQuestionId(nextId);
    } else {
        // Zdjecia się skończyły!
        console.warn(`Koniec pytań w kategorii ${currentCategory} (brak pliku ${nextId}.jpg)`);

        // Zakończ pojedynek z braku pytań
        // ... (logika zakończenia pojedynku: zdobycie pola i powrót do mapy)
        setGameState('map');
    }

    setIsCheckingNextQuestion(false);
}, [isCheckingNextQuestion, setGameState]);


const handleCorrectAnswer = useCallback(() => {
    setActivePlayer((prev: DuelPlayer) => (prev === 'challenger' ? 'defender' : 'challenger'));

    // Zamiast ślepego zwiększania, próbujemy przejść dalej
    tryAdvanceQuestion(questionId, getQuestionCategory());
}, [getQuestionCategory, questionId, tryAdvanceQuestion]);
