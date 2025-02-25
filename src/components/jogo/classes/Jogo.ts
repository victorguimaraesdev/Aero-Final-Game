import { Player } from "./Player";
import { Rock } from "./Rock";
import { Disparo } from "./Disparo";
import { Crosshair } from "./Crosshair";
import { Particula } from "./Particula";
import { Background } from "./Background";

// Classe jogo é responsável por renderizar o jogo.
// Todas as entidades do jogo são renderizadas aqui.
// Estão encapsuladas no objeto jogo.
export class Jogo {
    context: CanvasRenderingContext2D;
    player: Player;
    crosshair: Crosshair;
    rocks: Rock[];
    disparos: Disparo[];
    particulas: Particula[];
    background: Background;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.player = new Player(context.canvas.width, context.canvas.height);
        this.crosshair = new Crosshair(context);
        this.background = new Background(context, 100);
        this.rocks = [];
        this.disparos = [];
        this.particulas = [];
    }

    renderizarJogo = () => {
        // Loop do jogo
        this.inputsJogador();
        this.gerarPedras(this.context, 1000);

        // Desenha o jogo
        const draw = () => {
            //Pegar o o tempo e colocar como o modificador de velocidade
            this.context.imageSmoothingEnabled = false;
            this.context.clearRect(
                0,
                0,
                this.context.canvas.width,
                this.context.canvas.height
            ); // Limpa para o novo frame
            this.context.save(); // Salvando o estado do contexto

            //Background
            this.verificarColisoes();

            // Renderiza o background
            this.background.renderizar();

            // Desenha as particulas
            this.drawParticulas();

            //limpa as particulas
            this.limparParticulas();

            // Renderiza o array de pedras
            this.rocks.forEach((rock, index) => {
                rock.renderizar(rock, this.context);
                if (rock.position.y > this.context.canvas.height) {
                    this.rocks.splice(index, 1);
                }
            });

            // Renderiza o array de disparos
            this.disparos.forEach((disparo, index) => {
                disparo.update(this.context);
                if (disparo.position.y > this.context.canvas.height) {
                    this.disparos.splice(index, 1);
                }
            });

            // Renderiza o crosshair
            this.crosshair.renderizar();
            // Renderiza o player
            this.player.ajustarAngulo({ x: this.crosshair.x, y: this.crosshair.y });
            this.player.renderizar(this.player, this.context);
            this.context.restore(); // Restaurando o estado do contexto
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    };

    // Inputs do jogador
    inputsJogador = () => {
        // Evento de mover o mouse
        document.addEventListener("mousemove", (e) => {
            this.crosshair.update({ x: e.clientX, y: e.clientY });
        });

        // Evento de pressionar clique do mouse
        document.addEventListener("click", () => {
            this.gerarDisparos();
        });

        // Evento de pressionar a tecla
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            this.player.keydown(key);
        });

        // Evento de soltar a tecla
        document.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            this.player.keyup(key);
        });
    };
    //verificar colisão
    verificarColisoes = () => {
        this.rocks.forEach((rock) => {
            this.disparos.forEach((disparo) => {
                rock.colisao(disparo);
                disparo.colisao(rock);
                if (disparo.verificarColisao) {
                    this.gerarParticulas(disparo.position.x, disparo.position.y);
                }
            });
        });

        this.rocks = this.rocks.filter((rock) => !rock.verificarColisao);
        this.disparos = this.disparos.filter(
            (disparo) => !disparo.verificarColisao
        );
    };
    //Gerar as particulas
    gerarParticulas = (disparoX: number, disparoY: number) => {
        for (let i = 0; i < 10; i++) {
            const particula = new Particula(
                { x: disparoX, y: disparoY },
                { x: Math.random() - 0.5 * 2, y: Math.random() - 0.5 * 2 },
                5,
                "#b1afaf"
            );
            this.particulas.push(particula);
        }
    };
    //Renderiza as particulas
    drawParticulas = () => {
        this.particulas.forEach((particula) => {
            particula.update(this.context);
        });
    };
    // Limpar as particulas
    limparParticulas = () => {
        this.particulas.forEach((particula) => {
            if (particula.opacity <= 0) {
                this.particulas.splice(this.particulas.indexOf(particula), 1);
            }
        });
    };
    // Gera os disparos na tela
    gerarDisparos = () => {
        const novoDisparo = new Disparo(
            {
                x: this.player.position.x + this.player.largura / 2,
                y: this.player.position.y + this.player.altura / 2,
            },
            this.player.angulo - Math.PI / 2
        );
        this.disparos.push(novoDisparo);
    };

    // Gera as pedras a cada (2000) = 2 segundos.
    gerarPedras = (context: CanvasRenderingContext2D, intervalo: number) => {
        setInterval(() => {
            const novaPedra = new Rock(context.canvas.width, context.canvas.height);
            this.rocks.push(novaPedra);
        }, intervalo);
    };
}
