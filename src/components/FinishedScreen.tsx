// FinishedScreen.tsx
import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useGameContext } from '../context/GameContext.tsx';

/* -------------------------
   Animations (keyframes)
   ------------------------- */
const enter = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  60% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const pulseGlow = (c = '#17a2ff') => keyframes`
  0% { text-shadow: 0 0 8px ${c}66, 0 0 20px ${c}33; transform: translateY(0); }
  50% { text-shadow: 0 0 18px ${c}cc, 0 0 42px ${c}66; transform: translateY(-4px); }
  100% { text-shadow: 0 0 8px ${c}66, 0 0 20px ${c}33; transform: translateY(0); }
`;

const bounce = keyframes`
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-10px) scale(1.06); }
  50% { transform: translateY(0) scale(1); }
  100% { transform: translateY(0) scale(1); }
`;

/* -------------------------
   Styled components
   ------------------------- */
const FullscreenCenter = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #060606 0%, #000 100%);
`;

const StyledWrapper = styled(Box)(() => ({
  background: 'radial-gradient(circle at top, #181818 0%, #0b0b0b 70%)',
  color: '#ffffff',
  padding: '48px 36px',
  borderRadius: 16,
  textAlign: 'center',
  boxShadow: '0 0 40px rgba(0,0,0,0.7), inset 0 0 30px rgba(255,255,255,0.02)',
  maxWidth: 720,
  width: '92%',
  margin: '0 auto',
  animation: `${enter} 520ms cubic-bezier(.2,.8,.2,1) both`,
}));

const WinnerName = styled('span')<{ color?: string }>(({ color = '#17a2ff' }) => ({
  color: '#fff',
  display: 'inline-block',
  padding: '0 6px',
  borderRadius: 6,
  background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
  animation: `${pulseGlow(color)} 2000ms ease-in-out infinite`,
  boxShadow: `0 6px 18px ${color}22, 0 0 10px ${color}11 inset`,
}));

const Trophy = styled('span')(() => ({
  display: 'inline-block',
  marginRight: 10,
  fontSize: 34,
  lineHeight: 1,
  transformOrigin: '50% 50%',
  animation: `${bounce} 1400ms ease-in-out infinite`,
  '@media (max-width: 420px)': {
    fontSize: 28,
  },
}));

const RestartButton = styled(Button)`
  background: linear-gradient(180deg, #17a2ff, #0a84c9);
  color: white;
  padding: 14px 36px;
  font-size: 1.05rem;
  font-weight: 800;
  border-radius: 12px;
  margin-top: 34px;
  box-shadow: 0 10px 30px rgba(23,162,255,0.28);
  transition: transform 0.22s, box-shadow 0.22s;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 14px 38px rgba(23,162,255,0.44);
  }
`;

/* -------------------------
   Simple Confetti Canvas
   ------------------------- */
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  life: number;
  ttl: number;
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * createConfetti returns a cleanup function () => void
 * It ensures ctx is not null before proceeding (TS-safe).
 */
function createConfetti(canvas: HTMLCanvasElement, duration = 2200) {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return () => {};

  const ctx = maybeCtx as CanvasRenderingContext2D;

  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);
  const colors = ['#17a2ff', '#ffb86b', '#ff5a7a', '#7efc6b', '#c792ff', '#fff475'];
  const particles: Particle[] = [];

  const spawn = (count: number) => {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: random(w * 0.35, w * 0.65),
        y: random(h * 0.25, h * 0.45),
        vx: random(-4, 4),
        vy: random(-10, -4),
        size: random(6, 12),
        rot: random(0, Math.PI * 2),
        vr: random(-0.12, 0.12),
        color: colors[(Math.random() * colors.length) | 0],
        life: 0,
        ttl: random(60, 120),
      });
    }
  };

  let raf = 0;

  // initial burst
  spawn(28);

  function render() {
    ctx.clearRect(0, 0, w, h);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vy += 0.28; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();

      if (p.y > h + 30 || p.life > p.ttl) {
        particles.splice(i, 1);
      }
    }

    // occasional small spawn to keep it lively for short time
    if (Math.random() < 0.08) spawn(1);

    if (particles.length > 0) {
      raf = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(raf);
    }
  }

  render();

  // stop after `duration` ms (particles will naturally die out)
  const stopper = setTimeout(() => {
    // nothing needed here — cleanup will clear raf/timeouts
  }, duration);

  return () => {
    clearTimeout(stopper);
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, w, h);
  };
}

/* -------------------------
   FinishedScreen component
   ------------------------- */
const FinishedScreen: React.FC = () => {
  const {
    general: { winner },
    actions: { handleReturnToMap },
  } = useGameContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stopConfettiRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!winner) {
      handleReturnToMap();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // launch confetti once when component mounts
    stopConfettiRef.current = createConfetti(canvas, 2600);

    // optional: resize handler to keep canvas full-screen
    const onResize = () => {
      const cv = canvasRef.current;
      if (!cv) return;
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (stopConfettiRef.current) stopConfettiRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  if (!winner) return null;

  return (
    <FullscreenCenter>
      {/* canvas sits behind visually but in DOM above/below as needed */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          zIndex: 250,
        }}
      />
      <StyledWrapper>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1,
            textShadow: '0 0 12px rgba(255,255,255,0.08)',
            letterSpacing: '0.6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Trophy aria-hidden>🏆</Trophy>
          <WinnerName color={winner.color ?? '#17a2ff'}>{winner.name}</WinnerName>
          <span style={{ color: '#d0d0d0', marginLeft: 8, fontWeight: 600 }}>wygrał!</span>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#bfbfbf',
            mb: 3,
            fontWeight: 400,
            letterSpacing: '0.4px',
          }}
        >
          Gratulacje, Floor Master!
        </Typography>

        <RestartButton onClick={handleReturnToMap}>Kolejna runda?</RestartButton>
      </StyledWrapper>
    </FullscreenCenter>
  );
};

export default FinishedScreen;
