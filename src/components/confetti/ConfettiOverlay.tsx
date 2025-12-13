import {useConfetti} from './useConfetti.ts'; // Zmień ścieżkę do useConfetti
import {styled} from '@mui/material/styles';

interface ConfettiOverlayProps {
    duration?: number; // Time of animation in ms
    initialBurst?: number;
    zIndex?: number;
}

const StyledCanvas = styled('canvas')({
    position: 'fixed',
    left: 0,
    top: 0,
    pointerEvents: 'none', // Important to not block clicks below
    width: '100%',
    height: '100%',
});

const ConfettiOverlay = ({duration = 2600, initialBurst = 40, zIndex = 250}: ConfettiOverlayProps) => {
    const canvasRef = useConfetti(duration, initialBurst);

    return (
        <StyledCanvas
            ref={canvasRef}
            style={{zIndex}}
            aria-hidden="true" // Decorative element
        />
    );
};

export default ConfettiOverlay;
