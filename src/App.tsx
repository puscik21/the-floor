import {CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';
import {GameContextProvider} from './context/GameContext.tsx';
import GameContent from './components/GameContent.tsx';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <GameContextProvider>
                <GameContent/>
            </GameContextProvider>
            <ToastContainer/>
        </ThemeProvider>
    );
}

export default App;
