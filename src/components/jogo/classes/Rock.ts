import { CAMINHO_PEDRA_IMAGE } from "../../../utils/Constantes";
import { Disparo } from "./Disparo";

export class Rock {
  largura: number;
  altura: number;
  velocidade: number;
  rotationSpeed: number;
  position: { x: number; y: number };
  image: HTMLImageElement;
  angle: number;
  verificarColisao: boolean;

  constructor(larguraTela: number, alturaTela: number) {
    this.largura = Math.min(larguraTela, alturaTela) * 0.05;
    this.altura = Math.min(larguraTela, alturaTela) * 0.05;
    this.velocidade = alturaTela * 0.003;
    this.rotationSpeed = 0.5;
    this.verificarColisao = false;
    this.position = {
      x: this.spawn(0, larguraTela - this.largura),
      y: -100,
    };
    this.image = this.getImg(CAMINHO_PEDRA_IMAGE);
    this.angle = 0;
  }

  getImg = (path: string) => {
    const image = new Image();
    image.src = path;
    return image;
  };

  spawn = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  draw = (context: CanvasRenderingContext2D) => {
    context.save();

    context.translate(
      this.position.x + this.largura / 2,
      this.position.y + this.altura / 2
    );
    this.angle += this.rotationSpeed;
    context.rotate((this.angle * Math.PI) / 180);
    context.drawImage(
      this.image,
      -this.largura / 2,
      -this.altura / 2,
      this.largura,
      this.altura
    );

    context.restore();
  };

  mover = () => {
    this.position.y += this.velocidade;
  };

  renderizar = (rocks: Rock, context: CanvasRenderingContext2D) => {
    rocks.mover();
    rocks.draw(context);
  };
  colisao = (disparo: Disparo) => {
    if (
      disparo.position.x + disparo.largura >= this.position.x &&
      disparo.position.x <= this.position.x + this.largura &&
      disparo.position.y + disparo.altura >= this.position.y &&
      disparo.position.y <= this.position.y + this.largura
    ) {
      this.verificarColisao = true;
    }
  };
}
