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
    speed: 3,
    trafic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}



function startGame(){
    start.classList.add('hide');
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px'; // расстояние между линиями
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.trafic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = 100 * setting.trafic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car); // добавляем элемент к блоку gameArea
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    
    if (setting.start) {
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }

        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }

        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

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

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.trafic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}
