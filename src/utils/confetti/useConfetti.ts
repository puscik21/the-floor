import {type RefObject, useEffect, useRef} from 'react';

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

function createConfettiAnimation(canvas: HTMLCanvasElement, duration: number, initialBurst: number) {
    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return () => {
    };

    const ctx = maybeCtx as CanvasRenderingContext2D;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const colors = ['#17a2ff', '#ffb86b', '#ff5a7a', '#7efc6b', '#c792ff', '#fff475'];
    const particles: Particle[] = [];

    const spawn = (count: number) => {
        for (let i = 0; i < count; i++) {
            particles.push({
                x: random(w * 0.35, w * 0.65),
                y: random(h * 0.1, h * 0.30),
                vx: random(-4, 4),
                vy: random(-10, -4),
                size: random(15, 30),
                rot: random(0, Math.PI * 2),
                vr: random(-0.12, 0.12),
                color: colors[(Math.random() * colors.length) | 0],
                life: 0,
                ttl: random(80, 150),
            });
        }
    };

    let raf = 0;
    const startTime = performance.now();

    // initial burst
    spawn(initialBurst);

    function render(time: number) {
        ctx.clearRect(0, 0, w, h);

        const elapsed = time - startTime;

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

            // remove conditions
            if (p.y > h + 30 || p.life > p.ttl) {
                particles.splice(i, 1);
            }
        }

        // occasional small spawn to keep it lively for short time
        if (elapsed < duration) {
            if (Math.random() < 0.08) spawn(1);
            raf = requestAnimationFrame(render);
        } else if (particles.length > 0) {
            raf = requestAnimationFrame(render);
        } else {
            cancelAnimationFrame(raf);
        }
    }

    render(startTime);

    // Obsługa zmiany rozmiaru okna
    const onResize = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    };
    window.addEventListener('resize', onResize);


    // cleaning function
    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}

/**
 * Hook for maintaining confetti lifetime.
 * @param duration Time to live of 'active' confetti (in ms).
 * @param initialBurst - init number of particles
 */
export const useConfetti = (duration: number, initialBurst: number): RefObject<HTMLCanvasElement| null> => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stopConfettiRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Run confetti
        stopConfettiRef.current = createConfettiAnimation(canvas, duration, initialBurst);

        return () => {
            // Cleanup
            if (stopConfettiRef.current) {
                stopConfettiRef.current();
            }
        };
    }, [duration, initialBurst]);

    return canvasRef;
};
