const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    dx: 5
};

const bullets = [];
const enemies = [];

function drawSpaceship() {
    context.fillStyle = 'white';
    context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawBullet(bullet) {
    context.fillStyle = 'red';
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
}

function drawEnemy(enemy) {
    context.fillStyle = 'green';
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSpaceship();

    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.dy;
        drawBullet(bullet);

        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.y += enemy.dy;
        drawEnemy(enemy);

        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });

    requestAnimationFrame(update);
}

function moveLeft() {
    spaceship.x -= spaceship.dx;
    if (spaceship.x < 0) {
        spaceship.x = 0;
    }
}

function moveRight() {
    spaceship.x += spaceship.dx;
    if (spaceship.x + spaceship.width > canvas.width) {
        spaceship.x = canvas.width - spaceship.width;
    }
}

function shoot() {
    const bullet = {
        x: spaceship.x + spaceship.width / 2 - 2.5,
        y: spaceship.y,
        width: 5,
        height: 10,
        dy: 7
    };
    bullets.push(bullet);
}

function spawnEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        dy: 3
    };
    enemies.push(enemy);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        moveRight();
    } else if (e.key === ' ') {
        shoot();
    }
});

setInterval(spawnEnemy, 1000);

update();
