export class Crosshair {
    private context: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    private largura: number;
    private altura: number;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = context.canvas.width / 2;
        this.y = context.canvas.height / 2;
        this.largura = Math.min(context.canvas.width) * 0.005;
        this.altura = Math.min(context.canvas.width) * 0.005;
    }

    public update(aim: Position) {
        this.x = aim.x;
        this.y = aim.y;
    }

    public renderizar() {
        this.context.save();
        this.context.fillStyle = "white";
        this.context.fillRect(this.x - this.largura / 2, this.y - this.altura / 2, this.largura, this.altura);
        this.context.restore();
    }
} 