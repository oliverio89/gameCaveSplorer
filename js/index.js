window.onload = () => {

    document.getElementById('start-button').onclick = () => {
        startGame();
    }

    function startGame() {
        document.getElementById('cave').pause()
        document.getElementById('invest').pause()
        app.init()
    }

}


