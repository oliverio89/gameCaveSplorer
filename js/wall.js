class Wall {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.backgroundSize = canvasSize
        this.backgroundSize = {
            w: this.backgroundSize.w,
            h: this.backgroundSize.h
        }
        this.wallVelY = 3
        this.wallPosY = 0
        this.wallWidth = 300
        this.wallHeight = 25
        this.wallPosX = (Math.random() * this.backgroundSize.w) - this.wallWidth


    }

    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.wallPosX, this.wallPosY, this.wallWidth, this.wallHeight)
        this.move()
    }

    move() {
        this.wallPosY += this.wallVelY
    }
}

