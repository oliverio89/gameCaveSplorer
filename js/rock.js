class Rock {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.backgroundSize = canvasSize
        this.backgroundSize = {
            w: this.backgroundSize.w,
            h: this.backgroundSize.h
        }
        this.rockVelY = 3
        this.rockPosY = 0
        this.rockWidth = 85
        this.rockHeight = 85
        this.rockPosX = (Math.random() * this.backgroundSize.w) - this.rockWidth
        this.image = new Image()
        this.image.src = './img/roca.png'
        this.image.width = 100
        this.image.height = 100


    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.rockPosX,
            this.rockPosY,
            this.rockWidth,
            this.rockHeight
        )
        this.move()
    }

    move() {
        this.rockPosY += this.rockVelY
    }
}