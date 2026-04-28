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
let fruitMode = 'all';
let basketMode = 'woven';
let bgMode = 'meadow';
let highScore = 0;
let basketX;
let apples = [];
let score = 0;
let lives = 3;
let speed;
let spawnInterval;
let lastSpawn = 0;
let gameRunning = false;
let animFrame;
let lastFrameTime = 0;
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

    // On-screen arrow buttons for mobile
    const leftBtn = document.getElementById('btn-left');
    const rightBtn = document.getElementById('btn-right');
    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('touchstart', e => { e.preventDefault(); keys['ArrowLeft'] = true; });
        leftBtn.addEventListener('touchend', e => { e.preventDefault(); keys['ArrowLeft'] = false; });
        leftBtn.addEventListener('touchcancel', e => { keys['ArrowLeft'] = false; });
        rightBtn.addEventListener('touchstart', e => { e.preventDefault(); keys['ArrowRight'] = true; });
        rightBtn.addEventListener('touchend', e => { e.preventDefault(); keys['ArrowRight'] = false; });
        rightBtn.addEventListener('touchcancel', e => { keys['ArrowRight'] = false; });
        // Safety: clear both when any touch ends outside buttons
        document.addEventListener('touchend', () => {
            if (!leftBtn.matches(':active')) keys['ArrowLeft'] = false;
            if (!rightBtn.matches(':active')) keys['ArrowRight'] = false;
        });
    }

    setupCharacterSelect();
    fetchHighScore();
}

async function fetchHighScore() {
    try {
        const resp = await fetch('api/scores');
        const data = await resp.json();
        if (data.total && data.total.length > 0) {
            highScore = data.total[0].score;
            document.getElementById('high-score').textContent = highScore;
        }
    } catch (e) {}
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

    // Draw all fruit previews
    const previews = {
        'pear-preview': drawPear,
        'orange-preview': drawOrange,
        'banana-preview': drawBanana,
        'grapes-preview': drawGrapes,
    };
    for (const [id, drawFn] of Object.entries(previews)) {
        const c = document.getElementById(id);
        const cx = c.getContext('2d');
        c.width = 48;
        c.height = 48;
        drawFn(cx, 10, 8, 28);
    }

    // "All" preview — show a few fruits
    const allCanvas = document.getElementById('all-preview');
    const allCtx = allCanvas.getContext('2d');
    allCanvas.width = 48;
    allCanvas.height = 48;
    drawApple(allCtx, 2, 4, 20);
    drawOrange(allCtx, 24, 4, 20);
    drawGrapes(allCtx, 13, 24, 20);

    // Draw background previews
    for (const [id, theme] of Object.entries(BG_THEMES)) {
        const c = document.getElementById('bg-' + id + '-preview');
        if (!c) continue;
        const cx = c.getContext('2d');
        c.width = 48; c.height = 36;
        cx.fillStyle = theme.sky; cx.fillRect(0, 0, 48, 36);
        cx.fillStyle = theme.skyTop; cx.fillRect(0, 0, 48, 12);
        cx.fillStyle = theme.ground; cx.fillRect(0, 28, 48, 8);
        if (theme.stars) {
            cx.fillStyle = '#fff';
            for (let i = 0; i < 8; i++) cx.fillRect((i * 7 + 3) % 44, (i * 5 + 2) % 20, 2, 2);
        }
        if (theme.clouds) {
            cx.fillStyle = 'rgba(255,255,255,0.5)';
            cx.beginPath(); cx.arc(15, 10, 5, 0, Math.PI * 2); cx.fill();
            cx.beginPath(); cx.arc(35, 8, 4, 0, Math.PI * 2); cx.fill();
        }
    }

    // Draw basket previews
    const basketPreviews = {
        'basket-woven-preview': drawBasketWoven,
        'basket-bucket-preview': drawBasketBucket,
        'basket-pot-preview': drawBasketPot,
    };
    for (const [id, drawFn] of Object.entries(basketPreviews)) {
        const c = document.getElementById(id);
        const cx = c.getContext('2d');
        c.width = 48;
        c.height = 36;
        drawFn(cx, 6, 4, 36, 28);
    }
}

function selectFruit(mode, el) {
    fruitMode = mode;
    el.parentElement.querySelectorAll('.fruit-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
}

function selectBasket(mode, el) {
    basketMode = mode;
    el.parentElement.querySelectorAll('.fruit-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
}

function selectBg(mode, el) {
    bgMode = mode;
    el.parentElement.querySelectorAll('.fruit-option').forEach(o => o.classList.remove('active'));
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
    lastFrameTime = 0;
    gameRunning = true;
    document.getElementById('game-over').style.display = 'none';
    updateHUD();
    animFrame = requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (!gameRunning) return;

    if (!lastFrameTime) lastFrameTime = timestamp;
    const dt = Math.min((timestamp - lastFrameTime) / 16.67, 3); // normalize to 60fps
    lastFrameTime = timestamp;

    update(timestamp, dt);
    draw();
    animFrame = requestAnimationFrame(gameLoop);
}

function update(timestamp, dt) {
    // Move basket with keyboard (dt-scaled)
    const moveSpeed = 6 * dt;
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
        const allFruits = ['apple', 'pear', 'orange', 'banana', 'grapes'];
        const fruit = fruitMode === 'all' ? allFruits[Math.floor(Math.random() * allFruits.length)] : fruitMode;
        apples.push({
            x: Math.random() * (CANVAS_W - APPLE_SIZE),
            y: -APPLE_SIZE,
            speed: speed + Math.random() * 0.5,
            type: fruit,
        });
        lastSpawn = timestamp;
        spawnInterval = Math.max(SPAWN_INTERVAL_MIN, spawnInterval * SPAWN_INTERVAL_DECAY);
    }

    // Increase speed over time (dt-scaled)
    speed += SPEED_INCREMENT * dt;

    // Update apples (dt-scaled)
    for (let i = apples.length - 1; i >= 0; i--) {
        const apple = apples[i];
        apple.y += apple.speed * dt;

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

const BG_THEMES = {
    meadow: {
        sky: '#87CEEB', skyTop: '#B0E0FF', clouds: true,
        ground: '#2ecc71', groundLine: '#27ae60', tufts: '#1e8449',
    },
    sunset: {
        sky: '#e67e22', skyTop: '#f39c12', clouds: true,
        ground: '#5a3e2b', groundLine: '#4a2e1b', tufts: '#3a2010',
    },
    night: {
        sky: '#1a1a3e', skyTop: '#0d0d2b', clouds: false,
        ground: '#1a3a1a', groundLine: '#0f2a0f', tufts: '#0a200a',
        stars: true,
    },
    snow: {
        sky: '#c8d8e8', skyTop: '#dce8f0', clouds: true,
        ground: '#f0f0f5', groundLine: '#dde0e8', tufts: '#c8ccd5',
    },
};

function draw() {
    const bg = BG_THEMES[bgMode] || BG_THEMES.meadow;

    // Sky
    ctx.fillStyle = bg.sky;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = bg.skyTop;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H / 3);

    // Stars (night only)
    if (bg.stars) {
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 40; i++) {
            const sx = (i * 97 + 13) % CANVAS_W;
            const sy = (i * 53 + 7) % (CANVAS_H - 100);
            ctx.fillRect(sx, sy, 2, 2);
        }
    }

    // Clouds
    if (bg.clouds) {
        ctx.fillStyle = bgMode === 'sunset' ? 'rgba(255,255,255,0.3)' :
                        bgMode === 'snow' ? 'rgba(255,255,255,0.6)' : '#fff';
        drawCloud(ctx, 50, 60, 50);
        drawCloud(ctx, 200, 30, 40);
        drawCloud(ctx, 380, 70, 35);
    }

    // Ground
    ctx.fillStyle = bg.ground;
    ctx.fillRect(0, CANVAS_H - GROUND_H, CANVAS_W, GROUND_H);
    ctx.fillStyle = bg.groundLine;
    ctx.fillRect(0, CANVAS_H - GROUND_H, CANVAS_W, 4);

    // Tufts
    ctx.fillStyle = bg.tufts;
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
    const fruitDrawers = {
        apple: drawApple, pear: drawPear, orange: drawOrange,
        banana: drawBanana, grapes: drawGrapes,
    };
    for (const f of apples) {
        (fruitDrawers[f.type] || drawApple)(ctx, f.x, f.y, APPLE_SIZE);
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
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('lives').textContent = '❤'.repeat(lives);
}

async function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animFrame);
    playGameOver();
    document.getElementById('final-score').textContent = score;

    // Check if score makes top 15
    let isTop = false;
    try {
        const resp = await fetch('api/scores');
        const data = await resp.json();
        const topScores = data.total || [];
        isTop = topScores.length < 15 || score > (topScores[topScores.length - 1]?.score || 0);
    } catch (e) {
        isTop = true;
    }

    if (isTop && score > 0) {
        document.getElementById('name-input-area').style.display = 'block';
        const savedName = localStorage.getItem('vinte-player-name') || '';
        document.getElementById('player-name').value = savedName;
        document.getElementById('player-name').focus();
    } else {
        document.getElementById('name-input-area').style.display = 'none';
    }
    document.getElementById('score-saved').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
}

async function submitScore() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }
    localStorage.setItem('vinte-player-name', name);
    try {
        await fetch('api/scores', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, score, character, fruit: fruitMode}),
        });
    } catch (e) {}
    if (score > highScore) highScore = score;
    // Go straight to leaderboard
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
        const resp = await fetch('api/scores');
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
    const playerName = localStorage.getItem('vinte-player-name') || '';
    let highlighted = false;
    list.innerHTML = data.map((entry, i) => {
        // Highlight the most recent entry matching the player's name and current score
        const isPlayer = !highlighted && entry.name === playerName && entry.score === score;
        if (isPlayer) highlighted = true;
        return `<div class="lb-row${isPlayer ? ' lb-highlight' : ''}">
            <span class="lb-rank">${i + 1}.</span>
            <span class="lb-name">${entry.name}</span>
            <span class="lb-score">${entry.score}</span>
        </div>`;
    }).join('');
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
