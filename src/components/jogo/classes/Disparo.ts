export class Projeteis {
    private context: CanvasRenderingContext2D;
    public projeteis: Disparo[] = [];
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.projeteis = [];
    }

    criarDisparo = (position: { x: number; y: number }, angulo: number) => {
        const disparo = new Disparo(position, angulo);
        this.projeteis.push(disparo);
    };

    desenhar = () => {
        this.projeteis.forEach((disparo) => {
            disparo.update(this.context);
        });
    };

    limparForaDaTela = () => {
        this.projeteis = this.projeteis.filter((disparo) => {
            return (
                disparo.position.x < this.context.canvas.width &&
                disparo.position.y < this.context.canvas.height &&
                disparo.position.x > 0 &&
                disparo.position.y > 0
            );
        });
    };

    renderizar = () => {
        this.desenhar();
        this.limparForaDaTela();
    };
}

class Disparo {
    position: { x: number; y: number };
    velocity: number;
    largura: number;
    altura: number;
    angulo: number;
    colidiu: boolean;
    constructor(position: { x: number; y: number }, angulo: number) {
        this.position = position;
        this.largura = 10;
        this.altura = 10;
        this.velocity = 20;
        this.angulo = angulo;
        this.colidiu = false;
    }

    desenhar = (context: CanvasRenderingContext2D) => {
        context.save();
        context.translate(
            this.position.x - this.largura,
            this.position.y - this.altura
        );
        context.fillStyle = "white";
        context.fillRect(
            this.largura / 2,
            this.altura / 2,
            this.largura,
            this.altura
        );
        context.restore();
    }

    update = (context: CanvasRenderingContext2D) => {
        this.desenhar(context);
        this.position.x += Math.cos(this.angulo) * this.velocity;
        this.position.y += Math.sin(this.angulo) * this.velocity;
    }
}
