import { useEffect, useRef, useState } from "react";
import Player from "../../classes/Player";
import Rock from "../../classes/Rock";
import gameLoop from "./scripts/GameLoop";

const keys = {
  left: false,
  right: false,
  up: false,
  down: false,
};

addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === "a") keys.left = true;
  if (key === "d") keys.right = true;
  if (key === "w") keys.up = true;
  if (key === "s") keys.down = true;
});
addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key === "a") keys.left = false;
  if (key === "d") keys.right = false;
  if (key === "w") keys.up = false;
  if (key === "s") keys.down = false;
});

const Canvas = ({ $largura, $altura }: tamanhoTela) => {
  const [player] = useState(new Player($largura, $altura));
  const [rock] = useState(new Rock($largura, $altura));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    gameLoop(canvas, context, keys, player, rock);
  }, [player, canvasRef]);

  return <canvas ref={canvasRef} width={$largura} height={$altura} />;
};

export default Canvas;
