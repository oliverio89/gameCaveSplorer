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
        this.obstacleWidth = 100
        this.obstacleHeight = 25
        this.obstaclePosX = (Math.random() * this.backgroundSize.w) - this.obstacleWidth


    }

    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.obstaclePosX, this.obstaclePosY, this.obstacleWidth, this.obstacleHeight)
        this.move()
    }

    move() {
        this.obstaclePosY += this.obstacleVelY
    }
}

