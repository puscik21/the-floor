import type {PodiumPosition} from '../../types.ts';

export const getStepStyles = (position: PodiumPosition) => {
    switch (position) {
        case 1:
            return {
                height: '65%',
                width: '28%',
                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                color: '#000',
                order: 2,
                shadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 10px 20px rgba(0, 0, 0, 0.5)',
            };
        case 2:
            return {
                height: '53%',
                width: '24%',
                background: 'linear-gradient(180deg, #C0C0C0 0%, #A9A9A9 100%)',
                color: '#000',
                order: 1,
                shadow: '0 0 30px rgba(192, 192, 192, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)',
            };
        case 3:
            return {
                height: '43%',
                width: '22%',
                background: 'linear-gradient(180deg, #CD7F32 0%, #B87333 100%)',
                color: '#000',
                order: 3,
                shadow: '0 0 20px rgba(205, 127, 50, 0.5), 0 6px 12px rgba(0, 0, 0, 0.3)',
            };
        default:
            return {};
    }
};
