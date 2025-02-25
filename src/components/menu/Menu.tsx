import { useState } from "react";
import { Volume } from "./Volume";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styled from "styled-components";
import space from "../../assets/images/space.gif";
import { filtroRetro } from "../../utils/FiltroRetro";
import { useSound } from "../../utils/hooks/useSound";

const Tela = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #1c1c1c;
    ${filtroRetro()};
`;

const Container = styled.div`
    height: 90%;
    width: 90%;
    background-image: url(${space});
    background-size: cover;
    background-color: #000000;
    border: outset 3px white;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Menu1 = styled.div<{ $ativo: boolean }>`
    display: ${(props) => (props.$ativo ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 5;
    height: 100%;
    width: 50%;
    gap: 10%;

    h1 {
        background-color: black;
        padding: 20px;
        border: outset 3px white;
        border-radius: 10px;
    }
`;

const Botoes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
`;

const Button = styled.div`
    width: 100%;
    height: 50px;
    padding: 10px;
    text-align: center;
    border: 3px outset gray;
    border-radius: 10px;
    background-color: black;

    &:hover {
        border: outset;
    }
`;

export const Menu = ({ setIsRun }: isRun) => {
    const [configMenu, setConfigMenu] = useState(false);
    const { tela } = useSelector((state: RootState) => state.fullscreenState);
    const [playSound] = useSound("select");

    return (
        <Tela>
            <Container>
                <Menu1 $ativo={!configMenu}>
                    <h1>Aero Final</h1>
                    <Botoes>
                        <Button onClick={() => { setIsRun(true) }}>Iniciar</Button>
                        <Button onClick={() => { setConfigMenu(true); playSound() }}>Configurações</Button>
                        <Button onClick={() => { window.api.send("fechar"); playSound() }}>Sair</Button>
                    </Botoes>
                </Menu1>
                <Menu1 onClick={playSound} $ativo={configMenu}>
                    <h1>Configurações</h1>
                    <Botoes>
                        <Button
                            onClick={() => {
                                window.api.send("fullscreen");
                            }}
                        >
                            {tela ? "Modo janela" : "Tela cheia"}
                        </Button>
                        <Button><Volume /></Button>
                        <Button onClick={() => setConfigMenu(false)}>Voltar</Button>
                    </Botoes>
                </Menu1>
            </Container>
        </Tela>
    );
};