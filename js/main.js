function multi() {
    let root = document.createElement('div');
    root.id = 'game_root';
    root.clientWidth = document.body.clientWidth;
    root.clientHeight = document.body.clientHeight;
    document.body.insertBefore(root, document.body.childNodes[0]);

    let gameArea1 = document.createElement('div');
    gameArea1.setAttribute('class', 'split left');
    root.insertBefore(gameArea1, root.childNodes[0]);

    let gameArea2 = document.createElement('div');
    gameArea2.setAttribute('class', 'split right');
    root.insertBefore(gameArea2, root.childNodes[0]);

    let game1 = new Game(gameArea1, 'key');
    let game2 = new Game(gameArea2, 'pointer');

    document.addEventListener('DOMContentLoaded', function () {
        game1.start();
        game2.start();
    });
}
function single() {

    let root = document.createElement('div');
    root.id = 'game_root';
    root.setAttribute('style', 'position: fixed; height: 100%; width: 100%')
    document.body.insertBefore(root, document.body.childNodes[0]);

    let game = new Game(root, 'pointer');

    document.addEventListener('DOMContentLoaded', function () {
        game.start();
    });
}

switch (window.location.toString().split('=')[1]) {
    case 'single' :
        single();
        break;
    case 'multi' :
        multi();
        break;
}