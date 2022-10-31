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

    player: undefined,

    background: undefined,

    framesCounter: 0,

    keys: undefined,



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
        console.log('hola')
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.moveAll()
            this.drawAll()

            this.generateObstacles()
            this.clearObstacles()

            this.isCollision() ? this.gameOver() : null // acordarse que no todas las colisiones acaban en game over

        }, 1000 / this.FPS);
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.background.draw()
        this.player.draw()
        this.obstacle.forEach(obs => obs.draw())

    },
    generateObstacles() {
        if (this.framesCounter % 90 === 0) {
            this.obstacle.push(new Obstacle(this.ctx, this.canvasSize,))
        }
    },
    clearObstacles() {
        this.obstacle = this.obstacle.filter(obs => obs.obstaclePosX >= 0)

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
    gameOver() {
        clearInterval(this.interval)
    },
    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.player = new Player(this.ctx, this.canvasSize)
        this.obstacle = []
    },
    moveAll() {
        this.player.setEventHandlers()
    }
}