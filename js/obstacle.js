class Obstacle {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.backgroundSize = canvasSize
        this.backgroundSize = {
            w: this.backgroundSize.w,
            h: this.backgroundSize.h
        }
        this.obstacleVelY = 3
        this.obstaclePosY = 0
        this.obstacleWidth = 70
        this.obstacleHeight = 70
        this.obstaclePosX = (Math.random() * this.backgroundSize.w) - this.obstacleWidth
        this.image = new Image()
        this.image.src = './img/diamante.png'


    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.obstaclePosX,
            this.obstaclePosY,
            this.obstacleWidth,
            this.obstacleHeight

        )
        this.move()
    }

    move() {
        this.obstaclePosY += this.obstacleVelY
    }
}

