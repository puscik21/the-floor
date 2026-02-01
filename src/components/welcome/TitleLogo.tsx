import {styled} from "@mui/material/styles";
import {motion} from "framer-motion";
import {Typography} from "@mui/material";

const TitleLogo = () => (
    <TitleContainer
        initial={{opacity: 0, y: -400}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
    >
        <TitleTop variant="h4">THE</TitleTop>
        <TitleBottom variant="h2">FLOOR</TitleBottom>
    </TitleContainer>
)

export default TitleLogo;

const TitleContainer = styled(motion.div)`
    padding: 10px 20px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 5px solid #FFC700;
    border-radius: 6px;
    background-color: rgba(0, 15, 30, 0.5);
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.8) inset,
    0 0 25px rgba(255, 165, 0, 0.8),
    0 0 50px rgba(0, 0, 0, 0.7);
`;

const TitleTextBase = styled(Typography)`
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(180deg, #FFD700 0%, #FFA500 40%, #D4AF37 80%, #FFD700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 215, 0, 0.5);
`;

const TitleTop = styled(TitleTextBase)`
    font-size: 1.8rem;
    margin-bottom: -10px;
`;

const TitleBottom = styled(TitleTextBase)`
    font-size: 4rem;
    padding-top: 5px;
`;
