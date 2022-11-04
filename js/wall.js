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
        this.wallWidth = 550
        this.wallHeight = 70
        this.wallPosX = (Math.random() * this.backgroundSize.w) - this.wallWidth
        this.image = new Image()
        this.image.src = './img/obstaculo1.png'

    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.wallPosX,
            this.wallPosY,
            this.wallWidth,
            this.wallHeight
        )
        this.move()
    }

    move() {
        this.wallPosY += this.wallVelY
    }
}

