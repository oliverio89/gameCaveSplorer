window.onload = () => {

    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    //document.getElementsByClassName('gameOver').style.display = "none";

    function startGame() {
        app.init()
    }


}


