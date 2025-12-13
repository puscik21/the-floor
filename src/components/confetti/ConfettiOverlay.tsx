import React from 'react';
import { useConfetti } from './useConfetti.ts'; // Zmień ścieżkę do useConfetti
import { styled } from '@mui/material/styles';

interface ConfettiOverlayProps {
    duration?: number; // Czas trwania animacji w ms (domyślnie 2600)
    zIndex?: number;   // Warstwa (domyślnie 250)
}

const StyledCanvas = styled('canvas')({
    position: 'fixed',
    left: 0,
    top: 0,
    pointerEvents: 'none', // Ważne, aby nie blokować kliknięć pod spodem
    width: '100%',
    height: '100%',
});

/**
 * Renderuje animację konfetti jako stałą nakładkę na całym ekranie.
 */
const ConfettiOverlay: React.FC<ConfettiOverlayProps> = ({ duration = 2600, zIndex = 250 }) => {
    const canvasRef = useConfetti(duration);

    return (
        <StyledCanvas
            ref={canvasRef}
            style={{ zIndex }}
            aria-hidden="true" // Element tylko dekoracyjny
        />
    );
};

export default ConfettiOverlay;
