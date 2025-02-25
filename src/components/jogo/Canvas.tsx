import { useEffect, useRef } from "react";
import { Jogo } from "./classes/Jogo";
import styled from "styled-components";

const Canva = styled.canvas`
  cursor: none;
  border: solid 3px white;
  background-color: #2c2c2c;
  z-index: 5;
  cursor: none;
  border: solid 3px white;
  background-color: #2c2c2c;
  z-index: 5;
`;

export const Canvas = ({ $largura, $altura, setIsRun }: Canvas) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "escape") setIsRun(false);
  });
  addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "escape") setIsRun(false);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    new Jogo(context!).renderizarJogo();
  }, []);

  return <Canva ref={canvasRef} width={$largura} height={$altura} />;
  return <Canva ref={canvasRef} width={$largura} height={$altura} />;
};

