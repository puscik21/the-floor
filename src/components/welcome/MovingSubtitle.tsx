import {motion} from "framer-motion";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

const MovingSubtitle = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{
                opacity: 1,
                y: [0, -10, 0],
                filter: [
                    'brightness(0.9)',
                    'brightness(1.15)',
                    'brightness(0.9)',
                ],
                textShadow: [
                    '0 0 6px rgba(0,0,0,0.6)',
                    '0 0 14px rgba(0,160,255,0.9)',
                    '0 0 6px rgba(0,0,0,0.6)',
                ],
            }}
            transition={{
                opacity: {delay: 0.8, duration: 1},
                y: {
                    delay: 1.2,
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                filter: {
                    delay: 1.2,
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                textShadow: {
                    delay: 1.2,
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            }}
        >
            <SubtitleText variant="h5">
                POLE. DECYZJA. SEKUNDA.<br/>
                Reszta to konsekwencje.
            </SubtitleText>
        </motion.div>
    )
}

export default MovingSubtitle;

const SubtitleText = styled(Typography)`
    margin-top: 24px;
    color: rgba(255, 255, 255, 0.8);
`;
