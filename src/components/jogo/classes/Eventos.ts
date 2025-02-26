import { Crosshair } from "./Crosshair";
import { Projeteis } from "./Disparo";
import { Player } from "./Player";

export class Eventos {

    public verificarColisao = (
        entidadesA: { position: { x: number, y: number }, largura: number, altura: number, colidiu: boolean }[],
        entidadesB: { position: { x: number, y: number }, largura: number, altura: number, colidiu: boolean }[]
    ): void => {
        for (const entidadeA of entidadesA) {
            for (const entidadeB of entidadesB) {
                if (
                    entidadeA.position.x < entidadeB.position.x + entidadeB.largura &&
                    entidadeA.position.x + entidadeA.largura > entidadeB.position.x &&
                    entidadeA.position.y < entidadeB.position.y + entidadeB.altura &&
                    entidadeA.position.y + entidadeA.altura > entidadeB.position.y
                ) {
                    entidadeA.colidiu = true;
                    entidadeB.colidiu = true;
                }
            }
        }
    }

    public inputTecla = (player: Player) => {
        // Evento de pressionar a tecla
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            player.keydown(key);
        });

        // Evento de soltar a tecla
        document.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            player.keyup(key);
        });
    };

    public inputMouse = (crosshair: Crosshair, player: Player, projeteis: Projeteis) => {
        // Evento de mover o mouse
        document.addEventListener("mousemove", (e) => {
            crosshair.update({ x: e.clientX, y: e.clientY });
        });

        // Evento de pressionar clique do mouse
        document.addEventListener("click", () => {
            projeteis.criarDisparo({
                x: player.position.x + player.largura / 2,
                y: player.position.y + player.altura / 2,
            },
                player.angulo - Math.PI / 2);
        });
    }
}