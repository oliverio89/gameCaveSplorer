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

    rock: [],

    player: undefined,

    background: undefined,

    framesCounter: 0,


    gameOver: undefined,

    score: 0,

    backgroundMusic: new Audio('./sound/GameMusic.mp3'),



    init() {
        document.querySelector('#canvas').style = 'display:block'
        document.querySelector('#game-intro').style = 'display:none'
        this.ctx = document.querySelector('#canvas').getContext('2d')
        this.setDimensions()

        this.start()
        this.backgroundMusic.loop = true
        this.backgroundMusic.play()







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
            this.generateRocks()
            this.clearRocks()
            this.player.keys.leftKey.pressed && this.player.moveLeft()
            this.player.keys.rigthKey.pressed && this.player.moveRigth()
            this.player.keys.upKey.pressed && this.player.moveUp()
            this.player.keys.downKey.pressed && this.player.moveDown()

            this.isCollision() ? this.gameFinaly() : null
            this.isCollisionBullets()
            this.isCollisionWalls() ? this.gameFinaly() : null
            this.isCollisionRocks() ? this.gameFinaly() : null
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
        this.rock.forEach(eachRock => eachRock.draw())
        this.drawScore()

    },
    generateObstacles() {
        if (this.framesCounter % 150 === 0) {
            this.obstacle.push(new Obstacle(this.ctx, this.canvasSize,))
        }
    },
    generateRocks() {
        if (this.framesCounter % 100 === 0) {
            this.rock.push(new Rock(this.ctx, this.canvasSize))
        }
    },

    generateWalls() {
        if (this.framesCounter % 200 === 0) {
            this.wall.push(new Wall(this.ctx, this.canvasSize))
        }
    },


    clearObstacles() {
        this.obstacle = this.obstacle.filter(obs => obs.obstaclePosX >= 0)
    },

    clearWalls() {
        this.wall = this.wall.filter(obs => obs.wallPosX >= 0)
    },
    clearRocks() {
        this.rock = this.rock.filter(obs => obs.rockPosX >= 0)
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
    isCollisionRocks() {
        return this.rock.some(obs => {
            return (
                this.player.playerPosY < obs.rockPosY + obs.rockHeight &&
                this.player.playerPosX + this.player.playerSize.w >= obs.rockPosX &&
                this.player.playerPosY + this.player.playerSize.h >= obs.rockPosY &&
                this.player.playerPosX <= obs.rockPosX + obs.rockWidth
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
                    let index = this.obstacle.indexOf(obs)
                    this.obstacle.splice(index, 1)
                    let indexBullets = this.player.bullets.indexOf(eachBullet)
                    this.player.bullets.splice(indexBullets, 1)
                    this.score++
                    let ColSound = new Audio('./sound/BING.mp3')
                    ColSound.play()
                }
            })
            this.rock.some(obs => {
                if (eachBullet.bulletsPosY < obs.rockPosY + obs.rockHeight &&
                    eachBullet.bulletsPosX + eachBullet.playerSizeW >= obs.rockPosX &&
                    eachBullet.bulletsPosY + eachBullet.playerSizeH >= obs.rockPosY &&
                    eachBullet.bulletsPosX <= obs.rockPosX + obs.rockWidth) {
                    let indexRock = this.rock.indexOf(obs)
                    this.rock.splice(indexRock, 1)
                    let indexBullets = this.player.bullets.indexOf(eachBullet)
                    this.player.bullets.splice(indexBullets, 1)
                    let rockSound = new Audio('./sound/crack.mp3')
                    rockSound.play()
                    this.player.playerVel += 1

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

    gameFinaly() {
        this.clearAll()
        clearInterval(this.interval)

        document.querySelector('#gameOver').style.display = 'block'
        document.querySelector('#game-finish').style.display = 'block'
        this.backgroundMusic.pause()
        let gameOverSound = new Audio('./sound/levelFailed.mp3')
        gameOverSound.play()
        let finishSound = new Audio('./sound/finishHim.mp3')
        finishSound.play()

    },
    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.player = new Player(this.ctx, this.canvasSize)
        this.obstacle = []
        this.wall = []
        this.rock = []
    },
    moveAll() {
        this.player.setEventHandlers()
    },
    drawScore() {

        this.ctx.font = "75px Poor Story, cursive"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Score: " + this.score, 100, 100)



    },

    winCondition() {
        if (this.score === 5) {
            clearInterval(this.interval)
            document.querySelector('#gameWin').style.display = 'block'
            this.backgroundMusic.pause()
            let crowdSound = new Audio('./sound/crowd.mp3')
            let winSound = new Audio('./sound/youWin.mp3')
            winSound.play()
            crowdSound.play()
        }
    }

}

