class Player {
    constructor(context, gameSize) {
        this.ctx = context
        this.keys = {
            leftKey: {
                pressed: false
            },


            rigthKey: {
                pressed: false
            },


            downKey: {
                pressed: false
            },


            upKey: {
                pressed: false
            },


            spaceKey: {
                pressed: false
            }
        },

            this.gameSize = gameSize
        this.gameSize = {
            w: this.gameSize.w,
            h: this.gameSize.h,
        }

        this.playerSize = {
            w: 120,
            h: 120
        }
        this.bullets = [];

        this.playerPosX = (this.gameSize.w / 2) - (this.playerSize.w / 2)
        this.playerPosY = this.gameSize.h - this.playerSize.h - 20
        this.playerY0 = this.playerPosY

        this.image = new Image();
        this.image.src = './img/enanoDEF.png'
        this.image.frames = 3
        this.image.framesIndex = 0
        this.playerVel = 10

    }
    draw(framesCounter) {

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height / 4,
            this.playerPosX,
            this.playerPosY,
            this.playerSize.h,
            this.playerSize.w,
        )
        this.animate(framesCounter)
        this.bullets.forEach(bullet => bullet.draw(framesCounter))

        this.clearBullets()
        this.limtis()

    }

    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case "ArrowLeft":
                    this.keys.leftKey.pressed = true

                    break;
                case "ArrowRight":
                    this.keys.rigthKey.pressed = true

                    break;
                case "ArrowUp":
                    this.keys.upKey.pressed = true

                    console.log('hello true')
                    break;
                case "ArrowDown":
                    this.keys.downKey.pressed = true


                    break;
                case " ":
                    this.keys.spaceKey.pressed = true
                    event.preventDefault()
                    this.shoot()
                    break;

            }
        }
        document.onkeyup = event => {
            switch (event.key) {
                case "ArrowLeft":
                    this.keys.leftKey.pressed = false

                    break;
                case "ArrowRight":
                    this.keys.rigthKey.pressed = false
                    break;
                case "ArrowUp":
                    this.keys.upKey.pressed = false
                    console.log('hello false')
                    break;
                case "ArrowDown":
                    this.keys.downKey.pressed = false

                    break;
                case " ":
                    this.keys.spaceKey.pressed = false
                    break;
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
    // move() {
    //     if (this.playerPosY >= this.gameSize.h - this.playerSize.h) {
    //         this.playerPosY = this.playerPosY - 5
    //     }

    //     if (this.playerPosX >= this.gameSize.w - this.playerSize.w) {
    //         this.playerPosX = this.playerPosX - 5
    //     }
    //     if (this.playerPosY <= (this.gameSize.h - this.gameSize.h)) {
    //         this.playerPosY = this.playerPosY + 5
    //     }

    //     if (this.playerPosX <= (this.gameSize.w - this.gameSize.w)) {
    //         this.playerPosX = this.playerPosX + 5
    //     }
    // }

    moveLeft() {
        this.playerPosX -= this.playerVel
    }
    moveRigth() {
        this.playerPosX += this.playerVel
    }
    moveUp() {
        this.playerPosY -= this.playerVel
    }
    moveDown() {
        this.playerPosY += this.playerVel
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.playerPosX, this.playerPosY, this.playerSize.w, this.playerSize.h))
        let shootSound = new Audio('./sound/axesu.mp3')
        shootSound.play()

    }
    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletsPosX <= this.gameSize.w)
    }
    limtis() {
        if (this.playerPosY >= this.gameSize.h - this.playerSize.h) {
            this.playerPosY = this.gameSize.h - this.playerSize.h
        }

        if (this.playerPosX >= this.gameSize.w - this.playerSize.w) {
            this.playerPosX = this.gameSize.w - this.playerSize.w
        }
        if (this.playerPosY <= (this.gameSize.h - this.gameSize.h)) {
            this.playerPosY = 0
        }

        if (this.playerPosX <= (this.gameSize.w - this.gameSize.w)) {
            this.playerPosX = 0
        }
    }


}





