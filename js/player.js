class Player {
    constructor(context, gameSize) {
        this.ctx = context

        this.gameSize = gameSize
        this.gameSize = {
            w: this.gameSize.w,
            h: this.gameSize.h,
        }

        this.playerSize = {
            w: 100,
            h: 100
        }
        this.bullets = [];

        this.playerPosX = (this.gameSize.w / 2) - (this.playerSize.w / 2)
        this.playerPosY = this.gameSize.h - this.playerSize.h - 20
        this.playerY0 = this.playerPosY

        this.image = new Image();
        this.image.src = './img/player.png'
        this.image.frames = 3
        this.image.framesIndex = 0

    }
    draw(framesCounter) {

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.playerPosX,
            this.playerPosY,
            this.playerSize.h,
            this.playerSize.w
        )
        this.animate(framesCounter)
        this.bullets.forEach(bullet => bullet.draw())
        this.move()
        this.clearBullets()

    }
    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.playerPosX -= 15
                    break;
                case 'ArrowRight':
                    this.playerPosX += 15
                    break;
                case 'ArrowUp':
                    this.playerPosY -= 15
                    break;
                case 'ArrowDown':
                    this.playerPosY += 15
                    break;
                case ' ':
                    event.preventDefault()
                    this.shoot()

            }
        }
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
        if (this.playerPosY >= this.gameSize.h - this.playerSize.h) {
            this.playerPosY = this.playerPosY - 5
        }

        if (this.playerPosX >= this.gameSize.w - this.playerSize.w) {
            this.playerPosX = this.playerPosX - 5
        }
        if (this.playerPosY <= (this.gameSize.h - this.gameSize.h)) {
            this.playerPosY = this.playerPosY + 5
        }

        if (this.playerPosX <= (this.gameSize.w - this.gameSize.w)) {
            this.playerPosX = this.playerPosX + 5
        }
    }
    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.playerPosX, this.playerPosY, this.playerSize.w, this.playerSize.h))

    }
    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletsPosX <= this.gameSize.w)
    }


}