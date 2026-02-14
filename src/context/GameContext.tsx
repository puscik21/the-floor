import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import type {DuelPlayer, GameConfig, GameContextValue, GameState, Player} from '../types';
import {useGameDuelState} from './useGameDuelState.ts';
import {useGameMapState} from './useGameMapState.ts';
import {notifyError} from "../utils/toast/notifier.tsx";
import {fetchJson} from "../utils/input/configFilesUtils.ts";

const GameContext = createContext<GameContextValue | undefined>(undefined);

const defaultGameConfig: GameConfig = {
    initTimeSeconds: 60,
    passPenaltySeconds: 3,
    winStreakForTimeBoost: 2,
    imageFileFormat: "png",
    correctAnswerButton: "space",
    passButton: "F",
    shufflePlayers: false
};

export const GameContextProvider = ({children}: { children: React.ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>('init');
    const [winner, setWinner] = useState<Player | null>(null);
    const [gameConfig, setGameConfig] = useState<GameConfig>(defaultGameConfig); // TODO: fix - always first duel goes with default config ._.

    useEffect(() => {
        fetchJson<GameConfig>("./config.json", defaultGameConfig).then(config => {
            setGameConfig(config);
        })
    }, []);

    const handleSetWinner = useCallback((player: Player | null) => setWinner(player), []);
    const handleStartGame = useCallback(() => setGameState('floor'), []);
    const handleStartDuel = useCallback(() => setGameState('duel'), []);

    // To omit circular dependencies
    const prepareDuelRef = useRef<((challenger: Player, defender: Player) => void)>(undefined);

    const startDuelWrapper = useCallback((challenger: Player, defender: Player) => {
        if (prepareDuelRef.current) {
            prepareDuelRef.current(challenger, defender);
        } else {
            notifyError("Nie udało sie załadować pojedynku!")
        }
    }, []);

    const {
        mapState,
        actions: mapActions,
    } = useGameMapState(gameConfig, gameState, startDuelWrapper);

    const {
        duelInfo,
        actions: duelActions,
    } = useGameDuelState(
        gameConfig,
        gameState,
        setGameState,
        handleSetWinner,
        mapActions.conquerTerritory,
        mapState.allPlayers
    );

    const prepareDuel = useCallback((challenger: Player, defender: Player) => {
        duelActions.prepareDuelState(challenger, defender);
        setGameState('ready');
    }, [duelActions, setGameState]);

    // here, at the end, we connect the real function with useRef
    useEffect(() => {
        prepareDuelRef.current = prepareDuel;
    }, [prepareDuel]);

    useEffect(() => {
        if (mapState.allPlayers.filter(player => player.isPlaying).length == 1) {
            setGameState('podium')
        }
    }, [mapState.allPlayers, mapState.positionToPlayer]);

    const activateTimeBoostForPlayer = useCallback((playerName: string, duelPlayer: DuelPlayer) => {
        mapActions.decreaseTimeBoostsOfPlayer(playerName);
        duelActions.addTimeBoostsToPlayerTimer(duelPlayer);
    }, [duelActions, mapActions]);

    const value: GameContextValue = {
        general: {
            gameState,
            winner,
        },
        map: mapState,
        duel: duelInfo,
        actions: {
            handleStartGame,
            handleStartDuel,
            activateTimeBoostForPlayer,
            ...mapActions,
            ...duelActions,
        },
        config: gameConfig
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameContextProvider');
    }
    return context;
};
