class Bullets {

    constructor(context, playerPosX, playerPosY, playerSizeW, playerSizeH) {

        this.ctx = context
        this.playerSizeW = 50
        this.playerSizeH = 50
        this.bulletsPosX = playerPosX + playerSizeW / 2
        this.bulletsPosY = playerPosY
        this.image = new Image();
        this.image.src = './img/axe.png'
        this.image.frames = 8
        this.image.framesIndex = 0

        // this.radius = 10;

        this.velY = 10;
    }

    draw(framesCounter) {
        // this.ctx.beginPath()
        // this.ctx.fillStyle = 'yellow'
        // this.ctx.arc(this.bulletsPosX, this.bulletsPosY, this.radius, 0, Math.PI * 2)
        // this.ctx.fill()
        // this.ctx.closePath()
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.bulletsPosX,
            this.bulletsPosY,
            this.playerSizeW,
            this.playerSizeH,
        )


        this.move()
        this.animate(framesCounter)

    }
    animate(framesCounter) {
        if (framesCounter % 15 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }

    move() {

        this.bulletsPosY -= this.velY;
    }

}
