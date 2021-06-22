const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'); // Создаём div

car.classList.add('car');    

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3
};

function startGame(){
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car); // добавляем элемент к блоку gameArea
    requestAnimationFrame(playGame);
}

function playGame() {
    console.log('Play Game!');
    if (setting.start) {
        requestAnimationFrame(playGame);
    }
}

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}
