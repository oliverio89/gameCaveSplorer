const app = {
    title: 'Cave Explorer',
    author: 'Victor moreno & Alex Lino',
    license: undefined,
    version: '0.0.1',
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined,
    },
    FPS: 60,

    obstacle: [],

    wall: [],

    player: undefined,

    background: undefined,

    framesCounter: 0,

    keys: undefined,

    score: 0,


    init() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
        this.setDimensions()
        this.start()



    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        document.querySelector('#canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('#canvas').setAttribute('height', this.canvasSize.h)
    },
    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.moveAll()
            this.drawAll()

            this.generateObstacles()
            this.clearObstacles()
            this.generateWalls()
            this.clearWalls()

            this.isCollision() ? this.gameOver() : null // acordarse que no todas las colisiones acaban en game over
            this.isCollisionBullets()
            this.isCollisionWalls() ? this.gameOver() : null
            this.winCondition()

        }, 1000 / this.FPS);

    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.obstacle.forEach(obs => obs.draw())
        this.wall.forEach(eachWall => eachWall.draw())
        this.drawScore()
    },
    generateObstacles() {
        if (this.framesCounter % 70 === 0) {
            this.obstacle.push(new Obstacle(this.ctx, this.canvasSize,))
        }
    },
    generateWalls() {
        if (this.framesCounter % 150 === 0) {
            this.wall.push(new Wall(this.ctx, this.canvasSize))
        }
    },


    clearObstacles() {
        this.obstacle = this.obstacle.filter(obs => obs.obstaclePosX >= 0)
    },

    clearWalls() {
        this.wall = this.wall.filter(obs => obs.wallPosX >= 0)
    },

    isCollision() {
        return this.obstacle.some(obs => {
            return (
                this.player.playerPosY < obs.obstaclePosY + obs.obstacleHeight &&
                this.player.playerPosX + this.player.playerSize.w >= obs.obstaclePosX &&
                this.player.playerPosY + this.player.playerSize.h >= obs.obstaclePosY &&
                this.player.playerPosX <= obs.obstaclePosX + obs.obstacleWidth
            )
        })
    },

    isCollisionBullets() {
        this.player.bullets.forEach(eachBullet => {
            this.obstacle.some(obs => {
                if (eachBullet.bulletsPosY < obs.obstaclePosY + obs.obstacleHeight &&
                    eachBullet.bulletsPosX + eachBullet.playerSizeW >= obs.obstaclePosX &&
                    eachBullet.bulletsPosY + eachBullet.playerSizeH >= obs.obstaclePosY &&
                    eachBullet.bulletsPosX <= obs.obstaclePosX + obs.obstacleWidth) {
                    let index = this.obstacle.indexOf(obs)                 //sacar un elemento de la array
                    this.obstacle.splice(index, 1)
                    let indexBullets = this.player.bullets.indexOf(eachBullet)
                    this.player.bullets.splice(indexBullets, 1)
                    this.score++
                }
            })

            this.wall.some(obs => {
                if (eachBullet.bulletsPosY < obs.wallPosY + obs.wallHeight &&
                    eachBullet.bulletsPosX + eachBullet.playerSizeW >= obs.wallPosX &&
                    eachBullet.bulletsPosY + eachBullet.playerSizeH >= obs.wallPosY &&
                    eachBullet.bulletsPosX <= obs.wallPosX + obs.wallWidth) {
                    let indexBullets = this.player.bullets.indexOf(eachBullet)
                    this.player.bullets.splice(indexBullets, 1)
                }
            })

        })
    },



    isCollisionWalls() {

        return this.wall.some(obs => {
            return this.player.playerPosY < obs.wallPosY + obs.wallHeight &&
                this.player.playerPosX + this.player.playerSize.w >= obs.wallPosX &&
                this.player.playerPosY + this.player.playerSize.h >= obs.wallPosY &&
                this.player.playerPosX <= obs.wallPosX + obs.wallWidth

        })
    },
    gameOver() {
        clearInterval(this.interval)
    },
    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.player = new Player(this.ctx, this.canvasSize)
        this.obstacle = []
        this.wall = []
    },
    moveAll() {
        this.player.setEventHandlers()
    },
    drawScore() {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: " + this.score, 100, 100)
        //this.fillText("hello World", canvas.width / 2, canvas.height / 2)
    },
    winCondition() {
        if (this.score == 3) {
            drawImage()
        }
    },
}

