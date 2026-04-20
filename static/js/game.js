const CANVAS_W = 480;
const CANVAS_H = 640;
const GROUND_H = 40;
const BASKET_W = 60;
const BASKET_H = 40;
const APPLE_SIZE = 28;
const CHAR_SIZE = 48;
const INITIAL_SPEED = 2;
const SPEED_INCREMENT = 0.0005;
const SPAWN_INTERVAL_START = 1200;
const SPAWN_INTERVAL_MIN = 300;
const SPAWN_INTERVAL_DECAY = 0.997;

let canvas, ctx;
let character = null; // 'oto' or 'lujza'
let fruitMode = 'apple'; // 'apple', 'pear', or 'both'
let basketX;
let apples = [];
let score = 0;
let lives = 3;
let speed;
let spawnInterval;
let lastSpawn = 0;
let gameRunning = false;
let animFrame;
let keys = {};
let touchStartX = null;

function initGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    document.addEventListener('keydown', e => {
        keys[e.key] = true;
        if (e.key === 'Escape' && gameRunning) endGame();
    });
    document.addEventListener('keyup', e => keys[e.key] = false);

    // Touch controls
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        touchStartX = e.touches[0].clientX;
    });
    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const scale = CANVAS_W / rect.width;
        basketX = Math.max(0, Math.min(CANVAS_W - BASKET_W, touchX * scale - BASKET_W / 2));
    });
    canvas.addEventListener('touchend', () => touchStartX = null);

    // Mouse control disabled — use keyboard or touch

    setupCharacterSelect();
}

function setupCharacterSelect() {
    // Draw Oto preview
    const otoCanvas = document.getElementById('oto-preview');
    const otoCtx = otoCanvas.getContext('2d');
    otoCanvas.width = 64;
    otoCanvas.height = 64;
    drawOto(otoCtx, 8, 8, 48);

    // Draw Lujza preview
    const lujzaCanvas = document.getElementById('lujza-preview');
    const lujzaCtx = lujzaCanvas.getContext('2d');
    lujzaCanvas.width = 64;
    lujzaCanvas.height = 64;
    drawLujza(lujzaCtx, 8, 8, 48);

    // Draw fruit previews
    const appleCanvas = document.getElementById('apple-preview');
    const appleCtx2 = appleCanvas.getContext('2d');
    appleCanvas.width = 48;
    appleCanvas.height = 48;
    drawApple(appleCtx2, 10, 8, 28);

    const pearCanvas = document.getElementById('pear-preview');
    const pearCtx = pearCanvas.getContext('2d');
    pearCanvas.width = 48;
    pearCanvas.height = 48;
    drawPear(pearCtx, 10, 8, 28);

    const bothCanvas = document.getElementById('both-preview');
    const bothCtx = bothCanvas.getContext('2d');
    bothCanvas.width = 64;
    bothCanvas.height = 48;
    drawApple(bothCtx, 2, 8, 28);
    drawPear(bothCtx, 34, 8, 28);
}

function selectFruit(mode, el) {
    fruitMode = mode;
    document.querySelectorAll('.fruit-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
}

function selectCharacter(char) {
    initAudio();
    character = char;
    document.getElementById('char-select').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    startGame();
}

function startGame() {
    basketX = CANVAS_W / 2 - BASKET_W / 2;
    apples = [];
    score = 0;
    lives = 3;
    speed = INITIAL_SPEED;
    spawnInterval = SPAWN_INTERVAL_START;
    lastSpawn = 0;
    gameRunning = true;
    document.getElementById('game-over').style.display = 'none';
    updateHUD();
    animFrame = requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (!gameRunning) return;

    update(timestamp);
    draw();
    animFrame = requestAnimationFrame(gameLoop);
}

function update(timestamp) {
    // Move basket with keyboard
    const moveSpeed = 6;
    let moved = false;
    if (keys['ArrowLeft'] || keys['a']) {
        basketX = Math.max(0, basketX - moveSpeed);
        moved = true;
    }
    if (keys['ArrowRight'] || keys['d']) {
        basketX = Math.min(CANVAS_W - BASKET_W, basketX + moveSpeed);
        moved = true;
    }
    if (moved && Math.random() < 0.15) playMove();

    // Spawn fruits
    if (timestamp - lastSpawn > spawnInterval) {
        const fruit = fruitMode === 'both' ? (Math.random() < 0.5 ? 'apple' : 'pear') : fruitMode;
        apples.push({
            x: Math.random() * (CANVAS_W - APPLE_SIZE),
            y: -APPLE_SIZE,
            speed: speed + Math.random() * 0.5,
            type: fruit,
        });
        lastSpawn = timestamp;
        spawnInterval = Math.max(SPAWN_INTERVAL_MIN, spawnInterval * SPAWN_INTERVAL_DECAY);
    }

    // Increase speed over time
    speed += SPEED_INCREMENT;

    // Update apples
    for (let i = apples.length - 1; i >= 0; i--) {
        const apple = apples[i];
        apple.y += apple.speed;

        // Check basket catch (basket is on top of character's head)
        const appleCenter = apple.x + APPLE_SIZE / 2;
        const basketTop = CANVAS_H - GROUND_H - CHAR_SIZE - BASKET_H + 4;
        if (apple.y + APPLE_SIZE > basketTop &&
            apple.y + APPLE_SIZE < basketTop + BASKET_H &&
            appleCenter > basketX &&
            appleCenter < basketX + BASKET_W) {
            apples.splice(i, 1);
            score++;
            playCatch();
            updateHUD();
            continue;
        }

        // Check floor hit
        if (apple.y + APPLE_SIZE > CANVAS_H - GROUND_H) {
            apples.splice(i, 1);
            lives--;
            playDrop();
            updateHUD();
            if (lives <= 0) {
                endGame();
                return;
            }
        }
    }
}

function draw() {
    // Clear
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Sky gradient effect (simple)
    ctx.fillStyle = '#B0E0FF';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H / 3);

    // Clouds
    ctx.fillStyle = '#fff';
    drawCloud(ctx, 50, 60, 50);
    drawCloud(ctx, 200, 30, 40);
    drawCloud(ctx, 380, 70, 35);

    // Ground
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, CANVAS_H - GROUND_H, CANVAS_W, GROUND_H);
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, CANVAS_H - GROUND_H, CANVAS_W, 4);

    // Grass tufts
    ctx.fillStyle = '#1e8449';
    for (let i = 0; i < CANVAS_W; i += 12) {
        ctx.fillRect(i, CANVAS_H - GROUND_H - 2, 3, 4);
    }

    // Draw character standing on the ground
    const charX = basketX + BASKET_W / 2 - CHAR_SIZE / 2;
    const charY = CANVAS_H - GROUND_H - CHAR_SIZE;
    if (character === 'oto') {
        drawOto(ctx, charX, charY, CHAR_SIZE);
    } else {
        drawLujza(ctx, charX, charY, CHAR_SIZE);
    }

    // Draw basket on top of character's head
    drawBasket(ctx, basketX, charY - BASKET_H + 4, BASKET_W, BASKET_H);

    // Draw fruits
    for (const apple of apples) {
        if (apple.type === 'pear') {
            drawPear(ctx, apple.x, apple.y, APPLE_SIZE);
        } else {
            drawApple(ctx, apple.x, apple.y, APPLE_SIZE);
        }
    }

    // Draw lives as hearts
    for (let i = 0; i < lives; i++) {
        drawHeart(ctx, CANVAS_W - 30 - i * 25, 10, 20);
    }

    // Score
    ctx.fillStyle = '#1a1a2e';
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillText('Skóre: ' + score, 10, 24);
}

function drawCloud(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.3, y - size * 0.15, size * 0.35, 0, Math.PI * 2);
    ctx.arc(x + size * 0.6, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
}

function updateHUD() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = '❤'.repeat(lives);
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animFrame);
    playGameOver();
    document.getElementById('final-score').textContent = score;
    document.getElementById('name-input-area').style.display = 'block';
    document.getElementById('score-saved').style.display = 'none';
    // Pre-fill name from last time
    const savedName = localStorage.getItem('vinte-player-name') || '';
    document.getElementById('player-name').value = savedName;
    document.getElementById('game-over').style.display = 'block';
    if (savedName) document.getElementById('player-name').focus();
}

async function submitScore() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }
    localStorage.setItem('vinte-player-name', name);
    try {
        await fetch('/api/scores', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, score, character, fruit: fruitMode}),
        });
    } catch (e) {}
    document.getElementById('name-input-area').style.display = 'none';
    document.getElementById('score-saved').style.display = 'block';
    // Show leaderboard after saving
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    await showLeaderboard();
}

let currentLbTab = 'weekly';
let lbData = null;

async function showLeaderboard() {
    document.getElementById('char-select').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    try {
        const resp = await fetch('/api/scores');
        lbData = await resp.json();
    } catch (e) {
        lbData = {total: [], weekly: []};
    }
    renderLeaderboard();
}

function hideLeaderboard() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('char-select').style.display = 'block';
}

function switchTab(tab, btn) {
    currentLbTab = tab;
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderLeaderboard();
}

function renderLeaderboard() {
    const list = document.getElementById('lb-list');
    const data = lbData ? lbData[currentLbTab] : [];
    if (!data || data.length === 0) {
        list.innerHTML = '<p class="lb-empty">Zatiaľ žiadne skóre</p>';
        return;
    }
    list.innerHTML = data.map((entry, i) =>
        `<div class="lb-row">
            <span class="lb-rank">${i + 1}.</span>
            <span class="lb-name">${entry.name}</span>
            <span class="lb-score">${entry.score}</span>
        </div>`
    ).join('');
}

function restartGame() {
    startGame();
}

function backToSelect() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('char-select').style.display = 'block';
}

window.addEventListener('load', initGame);
