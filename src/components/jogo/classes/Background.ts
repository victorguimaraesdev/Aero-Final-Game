export class Background {
    private context: CanvasRenderingContext2D;
    public particulas: Particula[] = [];
    private quantidadeParticulas: number;
    private contadorInicial: number

    constructor(context: CanvasRenderingContext2D, quantidade: number) {
        this.context = context;
        this.quantidadeParticulas = quantidade;
        this.contadorInicial = 0;
    }

    // Criador de particulas verifica se o array de particulas é menor que a quantidade de particulas
    // Se for menor, ele cria uma nova particula e adiciona ao array
    // Fazendo assim, o background terá sempre a quantidade de particulas desejada
    // As qu sai da tela são destruidas e novas são criadas
    private criadorDeParticulas = () => {
        const inicio = {
            x: 0,
            y: 0,
            radius: this.numeroAleatorio(1, 3),
            opacity: this.numeroAleatorio(0.3, 0.9),
        };
        for (let i = this.particulas.length; i < this.quantidadeParticulas; i++) {
            this.contadorInicial++;
            if (this.contadorInicial < this.quantidadeParticulas) {
                inicio.x = this.numeroAleatorio(0, this.context.canvas.width);
                inicio.y = this.numeroAleatorio(0, this.context.canvas.height);
            } else {
                inicio.x = this.numeroAleatorio(0, this.context.canvas.width);
                inicio.y = 0;
            }
            const particula = new Particula(this.context, inicio.x, inicio.y, inicio.radius, inicio.opacity);
            if (this.particulas.length < 50) {
                this.particulas.push(particula);
            }
        }
    };

    // Função que gera um numero aleatorio
    private numeroAleatorio(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    // Desenha as particulas no background e as move
    private desenhar = () => {
        this.particulas.forEach((particula) => {
            particula.mover();
            particula.desenhar();
        });
    };

    // O filtro pega apenas as particulas que estão dentro da tela e devolve um novo array com elas.
    // Descartando as que já sairam da tela para abrir espaço para novas particulas.
    private limparForaDaTela = () => {
        this.particulas = this.particulas.filter((particula) => {
            return particula.position.y < this.context.canvas.height
        });
    };

    // Função que renderiza o background
    public renderizar = () => {
        this.criadorDeParticulas();
        this.desenhar();
        this.limparForaDaTela();
    };
}

class Particula {
    public position: { x: number; y: number };
    private context: CanvasRenderingContext2D;
    private radius: number;
    private color: string;
    private opacity: number;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, radius: number, opacity: number) {
        this.context = context;
        this.color = "#b1afaf";
        this.position = {
            x: x,
            y: y,
        };
        this.radius = radius
        this.opacity = opacity;
    }

    public mover = () => {
        this.position.y += 1;
    };

    public desenhar = () => {
        this.context.save();
        this.context.globalAlpha = this.opacity;
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.restore();

        this.context.save();
        this.context.globalAlpha = this.opacity * 0.5;
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.moveTo(this.position.x - this.radius * 2, this.position.y);
        this.context.lineTo(this.position.x + this.radius * 2, this.position.y);
        this.context.moveTo(this.position.x, this.position.y - this.radius * 2);
        this.context.lineTo(this.position.x, this.position.y + this.radius * 2);
        this.context.stroke();
        this.context.restore();
    };
}