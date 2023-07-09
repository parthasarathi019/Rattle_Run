// select element
const btnPlay = document.getElementById('btnPlay');
const btnRepeat = document.getElementById('btnRepeat');
const cvs = document.getElementById('game-container');


let cvsBox;
if (window.innerWidth < 500) {
    cvsBox = Math.floor(window.innerWidth / 19) * 19;
} else {
    cvsBox = 494;
}
const box = cvsBox / 19;
cvs.setAttribute('width', cvsBox);
cvs.setAttribute('height', cvsBox);

const ctx = cvs.getContext('2d');

// get Image
const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

const headImg = new Image();
headImg.src = 'img/head.png';

const bodyImg = new Image();
bodyImg.src = 'img/body.png';

// get Audio
const dead = new Audio();
dead.src = 'audio/dead.mp3';

const eat = new Audio();
eat.src = 'audio/eat.mp3';

const up = new Audio();
up.src = 'audio/up.mp3';

const right = new Audio();
right.src = 'audio/right.mp3';

const down = new Audio();
down.src = 'audio/down.mp3';

const left = new Audio();
left.src = 'audio/left.mp3';


// useful variable
let d, game, score;
let isPlaying = false;
let snake = [
    {
        x: box,
        y: 3 * box
    }
];

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

const gameStart = () => {
    d = undefined;
        score = 0;
        snake = [
            {
                x: box,
                y: 3 * box
            }
        ];
        game = setInterval(gameRunning, 170); //সাপকে ধীর করতে, ব্যবধানের মানকে উচ্চ সংখ্যায় বাড়িয়ে দিন। উদাহরণস্বরূপ, আপনি `150` থেকে `250` বা অন্য কোনো মান পরিবর্তন করতে পারেন
        d = 'RIGHT';
}

const isGameOver = (head, snake) => {
    try {
    for (let i = 2; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;

    }

    catch (err) {
        return false;
    }
    
}

const btnEvent = (event)=>{
    const key = event.keyCode;
    if ((key === 13 || event.target.id === 'btnPlay' || event.target.id === 'btnRepeat') && !isPlaying) {
        if (event.target.id === 'btnPlay') btnPlay.classList.add('hidden');
        if (event.target.id === 'btnRepeat') btnRepeat.classList.add('hidden');
        gameStart();
        isPlaying = true;
    }
    if ((key === 37 || event.target.id === 'btnLeft') && d !== 'RIGHT') {
        left.play();
        d = 'LEFT'
    };
    if ((key === 38 || event.target.id === 'btnUp') && d !== 'DOWN') {
        up.play();
        d = 'UP';
    } 
    if ((key === 39 || event.target.id === 'btnRight') && d !== 'LEFT') {
        right.play();
        d = 'RIGHT';
    }
    if ((key === 40 || event.target.id === 'btnDown') && d !== 'UP') {
        down.play();
        d = 'DOWN';
    }
};

document.addEventListener('keydown', btnEvent);
document.addEventListener('touchstart', btnEvent);

const gameRunning = () => {
    ctx.drawImage(ground, 0, 0, cvsBox, cvsBox);
    ctx.drawImage(foodImg, food.x, food.y, box, box);


    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.drawImage(headImg, snake[i].x, snake[i].y, box, box);
        } else {
            ctx.drawImage(bodyImg, snake[i].x, snake[i].y, box, box);
    }
    }

    // old snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (food.x === snakeX && food.y === snakeY) {
        eat.play();
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box 
        }
    } else {
        snake.pop();
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || isGameOver(newHead, snake)) {
        dead.play();
        btnRepeat.classList.remove('hidden');
        isPlaying = false;
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = "28px Changa one";
    ctx.fillText(score, box * 2.5, box*1.5);
}


window.onload = () =>{
    ctx.drawImage(ground, 0, 0, cvsBox, cvsBox);
    ctx.drawImage(foodImg, food.x, food.y, box, box);
    ctx.drawImage(headImg, snake[0].x, snake[0].y, box, box);
}

