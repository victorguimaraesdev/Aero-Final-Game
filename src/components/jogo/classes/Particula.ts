export class Particula {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  radius: number;
  color: string;
  opacity: number;
  constructor(
    position: { x: number; y: number },
    velocity: { x: number; y: number },
    radius: number,
    color: string
  ) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.globalAlpha = this.opacity;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.restore();
  }
  update(context: CanvasRenderingContext2D) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.opacity = this.opacity - 0.01 <= 0 ? 0 : this.opacity - 0.01;
  }
}
