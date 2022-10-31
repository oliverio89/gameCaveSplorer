class Player {
    constructor(context, gameSize) {
        this.ctx = context

        this.gameSize = gameSize
        this.gameSize = {
            w: this.gameSize.w,
            h: this.gameSize.h,
        }


        this.playerImage = '../img/player.png'


        this.playerPosX = 100;
        this.playerPosY = 100//this.gameSize.h - this.playerSize.h - 20
        this.playerY0 = this.playerPosY
        this.playerSize = {
            w: 100,
            h: 100
        }
        this.playerInstance = new Image();
        this.playerInstance.src = this.playerImage
        this.playerInstance.frames = 3
        this.playerInstance.framesIndex = 0

    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.playerInstance,
            this.playerInstance.framesIndex * (this.playerInstance.width / this.playerInstance.frames),
            0,

            this.playerInstance.width / this.playerInstance.frames,
            this.playerInstance.height,
            this.playerPosX,
            this.playerPosY,
            this.playerSize.h,
            this.playerSize.w
        )
        this.animate(framesCounter)
        this.move()

    }
    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.playerPosX -= 10
                    break;
                case 'ArrowRight':
                    this.playerPosX += 10
                    break;
                case 'ArrowUp':
                    this.playerPosY -= 10
                    break;
                case 'ArrowDown':
                    this.playerPosY += 10
            }
        }
    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.playerInstance.framesIndex++;
        }
        if (this.playerInstance.framesIndex >= this.playerInstance.frames) {
            this.playerInstance.framesIndex = 0;
        }
    }
    move() {
        if (this.playerPosY >= this.gameSize.h - this.playerSize.h) {
            this.playerPosY = this.playerPosY - 5
        }

        if (this.playerPosX >= this.gameSize.w - this.playerSize.w) {
            this.playerPosX = this.playerPosX - 5
        }

    }
}