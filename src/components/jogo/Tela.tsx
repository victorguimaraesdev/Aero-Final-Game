import { useState, useEffect } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";

const Caixa = styled.div<{ $largura: number; $altura: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$largura}px;
  height: ${(props) => props.$altura}px;

  background-color: black;
  border: 10px solid #1c1c1c;
  border-top: 5px solid #1c1c1c;
  border-bottom: 5px solid #1c1c1c;
`;

export const Tela = ({ setIsRun }: isRun) => {
  const [tamanhoTela, setTamanhoTela] = useState({
    largura: window.innerWidth,
    altura: window.innerHeight,
  });

  const handleResize = () => {
    setTamanhoTela({ largura: window.innerWidth, altura: window.innerHeight });
    setIsRun(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

  return (
    <Caixa $largura={tamanhoTela.largura} $altura={tamanhoTela.altura}>
      <Canvas
        $largura={tamanhoTela.largura - 50}
        $altura={tamanhoTela.altura - 50}
      />
    </Caixa>
  );
};
