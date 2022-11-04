class Gold {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.backgroundSize = canvasSize
        this.backgroundSize = {
            w: this.backgroundSize.w,
            h: this.backgroundSize.h
        }
        this.goldVelY = 3
        this.goldPosY = 0
        this.goldWidth = 70
        this.goldHeight = 70
        this.goldPosX = (Math.random() * this.backgroundSize.w) - this.obstacleWidth
        this.image = new Image()
        this.image.src = './img/gold.png'


    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.goldPosX,
            this.goldPosY,
            this.goldWidth,
            this.goldHeight
        )
        this.move()
    }

    move() {
        this.goldPosY += this.goldVelY
    }
}