import {
    CAMINHO_NAVE_IMAGE,
    CAMINHO_MOTOR_IMAGE,
    CAMINHO_FOGO_SPRITES,
    FRAME_INICIAL,
} from "../../../utils/Constantes";

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
};

export class Player {
    largura: number;
    altura: number;
    position: { x: number; y: number };
    velocidade: number;
    vel_linear: number;
    vel_angular: number;
    angulo: number;
    engineImage: HTMLImageElement;
    engineSprites: HTMLImageElement;
    frameConter: number;
    image: HTMLImageElement;
    sx: number;
    hitbox: { x: number; y: number; radius: number };
    miraPosition: { x: number; y: number };

    constructor(larguraTela: number, alturaTela: number) {
        this.largura = Math.min(larguraTela, alturaTela) * 0.1;
        this.altura = Math.min(larguraTela, alturaTela) * 0.1;
        this.velocidade = Math.min(larguraTela, alturaTela) * 0.007;
        this.vel_linear = this.velocidade;
        this.vel_angular = this.velocidade * 0.7071;
        this.angulo = 0;
        this.sx = 0;
        this.frameConter = FRAME_INICIAL;
        this.position = {
            x: larguraTela / 2 - this.largura / 2,
            y: alturaTela - this.altura - 30,
        };
        this.image = this.getImg(CAMINHO_NAVE_IMAGE);
        this.engineImage = this.getImg(CAMINHO_MOTOR_IMAGE);
        this.engineSprites = this.getImg(CAMINHO_FOGO_SPRITES);
        this.hitbox = {
            x: this.position.x + this.largura / 2,
            y: this.position.y + this.altura / 2,
            radius: Math.min(this.largura, this.altura) / 4,
        };
        this.miraPosition = { x: 0, y: 0 };
    }

    getImg(path: string): HTMLImageElement {
        const image = new Image();
        image.src = path;
        return image;
    }

    rotate(angle: number): void {
        this.angulo = angle;
    }

    moveLeft(): void {
        this.position.x -= this.velocidade;
        this.updateHitbox();
    }

    moveRight(): void {
        this.position.x += this.velocidade;
        this.updateHitbox();
    }

    moveUp(): void {
        this.position.y -= this.velocidade;
        this.updateHitbox();
    }

    moveDown(): void {
        this.position.y += this.velocidade;
        this.updateHitbox();
    }

    updateHitbox(): void {
        this.hitbox.x = this.position.x + this.largura / 2;
        this.hitbox.y = this.position.y + this.altura / 2;
    }

    updateSprite(): void {
        if (this.frameConter === 0) {
            this.sx = this.sx === 96 ? 0 : this.sx + 48;
            this.frameConter = FRAME_INICIAL;
        }
        this.frameConter--;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.hitbox.x, this.hitbox.y);
        context.rotate(this.angulo);
        context.translate(-this.hitbox.x, -this.hitbox.y);

        // É a nave :)
        context.drawImage(this.image, this.position.x, this.position.y, this.largura, this.altura);
        context.drawImage(this.engineSprites, this.sx, 0, 48, 48, this.position.x, this.position.y + 10, this.largura, this.altura);
        context.drawImage(this.engineImage, this.position.x, this.position.y + 5, this.largura, this.altura);

        // Linha hitbox
        context.strokeStyle = 'red';
        context.beginPath();
        context.arc(this.hitbox.x, this.hitbox.y, this.hitbox.radius, 0, Math.PI * 2);
        context.stroke();

        context.restore();
        this.updateSprite();
    }

    renderizar = (player: Player, context: CanvasRenderingContext2D): void => {
        const tela = { largura: context.canvas.width, altura: context.canvas.height };

        context.translate(
            player.position.x + player.largura / 2,
            player.position.y + player.altura / 2
        );

        if (keys.left && player.position.x >= 0) {
            player.moveLeft();
        }
        if (keys.right && player.position.x < tela.largura - player.largura) {
            player.moveRight();
        }
        if (keys.up && player.position.y >= 1) {
            player.moveUp();
        }
        if (keys.down && player.position.y < tela.altura - player.altura) {
            player.moveDown();
        }

        context.beginPath();
        context.moveTo(0, 400);
        context.lineTo(0, -400);
        context.stroke();
        context.beginPath();
        context.moveTo(-400, 0);
        context.lineTo(400, 0);
        context.stroke();

        context.translate(
            -player.position.x - player.largura / 2,
            -player.position.y - player.altura / 2
        );

        // Desenha o Player
        player.draw(context);
    };

    keydown = (key: string): void => {
        if (key === "a") keys.left = true;
        if (key === "d") keys.right = true;
        if (key === "w") keys.up = true;
        if (key === "s") keys.down = true;
        this.ajustaVelocidade();
    };

    keyup = (key: string): void => {
        if (key === "a") keys.left = false;
        if (key === "d") keys.right = false;
        if (key === "w") keys.up = false;
        if (key === "s") keys.down = false;
        this.ajustaVelocidade();
    };

    ajustaVelocidade(): void {
        if ((keys.up && keys.left) || (keys.up && keys.right) || (keys.down && keys.left) || (keys.down && keys.right)) {
            this.velocidade = this.vel_linear * 0.7071;
        } else {
            this.velocidade = this.vel_linear;
        }
    }

    ajustarAngulo = (aim: Position): void => {
        this.miraPosition.x = aim.x;
        this.miraPosition.y = aim.y;
        const angle = Math.atan2(
            this.miraPosition.x - (this.position.x + this.largura / 2),
            -(this.miraPosition.y - (this.position.y + this.altura / 2))
        );
        this.rotate(angle);
    }
}