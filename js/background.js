class Background {
    constructor(context, backgroundSize) {
        this.ctx = context;
        this.backgroundSize = backgroundSize  //  this.backgroundSize = this.canvasSize

        this.backgroundInstance = undefined

        this.backgroundImage = './img/bg.png'

        this.backgroundPosX = 0
        this.backgroundPosY = 0
        this.backgroundSize = {
            w: this.backgroundSize.w,
            h: this.backgroundSize.h
        }
        this.backgroundVelY = 2;
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = this.backgroundImage



    }
    draw() {
        this.ctx.drawImage(
            this.backgroundInstance,
            this.backgroundPosX,
            this.backgroundPosY,
            this.backgroundSize.w,
            this.backgroundSize.h)

        this.ctx.drawImage(
            this.backgroundInstance,
            this.backgroundPosX,
            this.backgroundPosY - this.backgroundSize.h,
            this.backgroundSize.w,
            this.backgroundSize.h)

        this.move()
    }
    move() {
        if (this.backgroundPosY >= this.backgroundSize.h) {
            this.backgroundPosY = 0;
        }

        this.backgroundPosY += this.backgroundVelY;

    }
}