import { Player } from "./Player";
import { Rocks } from "./Rock";
import { Projeteis } from "./Disparo";
import { Crosshair } from "./Crosshair";
import { Background } from "./Background";
import { Eventos } from "./Eventos";

// Classe jogo é responsável por renderizar o jogo.
// Todas as entidades do jogo são renderizadas aqui.
// Estão encapsuladas no objeto jogo.
export class Jogo {
    context: CanvasRenderingContext2D;
    player: Player;
    crosshair: Crosshair;
    rocks: Rocks;
    projeteis: Projeteis;
    background: Background;
    eventos: Eventos;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.player = new Player(context.canvas.width, context.canvas.height);
        this.crosshair = new Crosshair(context);
        this.background = new Background(context, 100);
        this.projeteis = new Projeteis(context);
        this.rocks = new Rocks(context);
        this.eventos = new Eventos();
    }

    renderizarJogo = () => {
        this.rocks.gerarPedras(this.context, 1000);
        this.eventos.inputTecla(this.player);
        this.eventos.inputMouse(this.crosshair, this.player, this.projeteis);

        // Desenha o jogo
        const draw = () => {
            this.context.imageSmoothingEnabled = false;
            this.context.clearRect(
                0,
                0,
                this.context.canvas.width,
                this.context.canvas.height
            );
            this.context.save();

            // Verifica a colisão entre as pedras e os disparos
            this.eventos.verificarColisao(this.rocks.rocks, this.projeteis.projeteis);
            // Cria os diparos do jogador
            this.rocks.renderizar();
            // Renderiza o background
            this.projeteis.renderizar();
            // Renderiza as pedras
            this.crosshair.renderizar();
            // Renderiza o player
            this.background.renderizar();
            // Renderiza o crosshair
            this.player.ajustarAngulo({ x: this.crosshair.x, y: this.crosshair.y });
            this.player.renderizar(this.player, this.context);
            
            this.context.restore(); // Restaurando o estado do contexto

            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    };
}
