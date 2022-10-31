class Bullets {

    constructor(context, playerPosX, playerPosY, playerSizeW, playerSizeH) {

        this.ctx = context
        this.playerSizeW = playerSizeW
        this.playerSizeH = playerSizeH
        this.bulletsPosX = playerPosX + playerSizeW / 2
        this.bulletsPosY = playerPosY

        this.radius = 10;

        this.velY = 10;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black'
        this.ctx.arc(this.bulletsPosX, this.bulletsPosY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()

    }

    move() {

        this.bulletsPosY -= this.velY;
    }
}
