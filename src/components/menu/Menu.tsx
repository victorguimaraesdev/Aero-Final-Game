import { useState } from "react";
import styled from "styled-components";
import { Volume } from "./Volume";

const Tela = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #1c1c1c;
`;

const Container = styled.div`
  height: 90%;
  width: 90%;
  background-color: #000000;
  border: outset 3px white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Menu1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
  width: 50%;
  gap: 10%;

  h1 {
    background-color: black;
    padding: 20px;
    border: outset 3px white;
    border-radius: 10px;
  }

  p {
    width: 100%;
    word-wrap: break-word;
    text-align: center;
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

  &:hover {
    border: outset;
    background-color: black;
  }
`;

export const Menu = ({ setIsRun }: isRun) => {
    const [configMenu, setConfigMenu] = useState(false);

    return (
        <Tela>
            <Container>
                {!configMenu ? (
                    <Menu1>
                        <h1>Aero Final</h1>
                        <p></p>
                        <Botoes>
                            <Button onClick={() => setIsRun(true)}>Iniciar</Button>
                            <Button onClick={() => setConfigMenu(true)}>Configurações</Button>
                            <Button onClick={() => window.api.send("fechar")}>Sair</Button>
                        </Botoes>
                    </Menu1>
                ) : (
                    <Menu1>
                        <Botoes>
                            <Button
                                onClick={() => {
                                    window.api.send("maximizar");
                                }}
                            >
                                Janela/Tela Cheia
                            </Button>
                            <Button><Volume /></Button>
                            <Button onClick={() => setConfigMenu(false)}>Voltar</Button>
                        </Botoes>
                    </Menu1>
                )}
            </Container>
        </Tela>
    );
};
