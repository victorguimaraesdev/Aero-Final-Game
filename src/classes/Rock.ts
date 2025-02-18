import { PATH_ROCK_IMAGE } from "../utils/Constantes";

class Rock {
  width: number;
  height: number;
  position: { x: number; y: number };
  speed: number;
  image: HTMLImageElement;
  constructor(telaWidth: number, telaHeight: number) {
    this.width = telaHeight * 0.04;
    this.height = telaHeight * 0.04;
    this.speed = telaHeight * 0.01;
    this.position = {
      x: this.randon(50, 700),
      y: this.randon(50, 700),
    };
    this.image = this.getImg(PATH_ROCK_IMAGE);
  }
  getImg(path: string) {
    const image = new Image();
    image.src = path;
    return image;
  }
  randon(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
export default Rock;
