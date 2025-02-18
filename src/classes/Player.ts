import { PATH_SPACESHIP_IMAGE } from "../utils/Constantes";
class Player {
  width: number;
  height: number;
  position: { x: number; y: number };
  speed: number;
  rotation: number;
  image: HTMLImageElement;
  constructor(Width: number, Height: number) {
    this.width = Height * 0.08;
    this.height = Height * 0.08;
    this.speed = Height * 0.01;
    this.rotation = 0;
    this.position = {
      x: Width / 2 - this.width / 2,
      y: Height - this.height - 30,
    };
    this.image = this.getImg(PATH_SPACESHIP_IMAGE);
  }

  getImg(path: string) {
    const image = new Image();
    image.src = path;
    return image;
  }

  moveLeft() {
    this.position.x -= this.speed;
  }
  moveRight() {
    this.position.x += this.speed;
  }
  moveUp() {
    this.position.y -= this.speed;
  }
  moveDown() {
    this.position.y += this.speed;
  }
  rotationPlayer() {}
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

export default Player;
