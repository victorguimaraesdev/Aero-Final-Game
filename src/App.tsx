import styled from "styled-components";
import { Tela } from "./components/jogo/Tela";
import { BarraJanela } from "./components/menu/BarraJanela";
import { useState, useEffect } from "react";
import { Menu } from "./components/menu/Menu";
import { BackgroundMusic } from "./components/menu/BackgroundMusic";
import { setFullscreen } from "./store/reducers/fullscreenSlice";
import { useDispatch } from "react-redux";
import { Loading } from "./components/menu/FakeLoad";

const Jogo = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    color: white;
`;

function App() {
    const [isRun, setIsRun] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        window.api.receive("telacheia", () => dispatch(setFullscreen(true)));
        window.api.receive("sairtelacheia", () => dispatch(setFullscreen(false)));
    }, [dispatch]);

    return (
        <>
            <Loading />
            <Jogo>
                <BarraJanela />
                {!isRun && <>
                    <Menu {...{ isRun, setIsRun }} />
                    <BackgroundMusic />
                </>}
                {isRun && <Tela {...{ isRun, setIsRun }} />}
            </Jogo>
        </>
    );
}

export default App;
