/**
 * Sprites for Oto (hedgehog) and Lujza (squirrel)
 * Drawn with arcs and circles to match the rounded illustration style.
 */

function drawOto(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size / 2;
    ctx.save();

    // Spines (dark brown dome on top half)
    ctx.fillStyle = '#4a3728';
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.05, r * 0.95, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    // Spine texture (lighter spikes)
    ctx.fillStyle = '#6b5240';
    for (let angle = -150; angle <= -30; angle += 15) {
        const rad = angle * Math.PI / 180;
        const sx = cx + Math.cos(rad) * r * 0.7;
        const sy = cy - r * 0.05 + Math.sin(rad) * r * 0.7;
        const ex = cx + Math.cos(rad) * r * 1.0;
        const ey = cy - r * 0.05 + Math.sin(rad) * r * 1.0;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex - 2, ey);
        ctx.lineTo(ex + 2, ey);
        ctx.closePath();
        ctx.fill();
    }

    // Body (warm brown, bottom half)
    ctx.fillStyle = '#8B6914';
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.1, r * 0.85, 0, Math.PI);
    ctx.closePath();
    ctx.fill();

    // Belly/face (light tan, oval)
    ctx.fillStyle = '#F5DEB3';
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.15, r * 0.55, r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (big, round, white with black pupil)
    const eyeY = cy - r * 0.05;
    const eyeR = r * 0.15;
    // Left eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - r * 0.25, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx - r * 0.2, eyeY + 1, eyeR * 0.55, 0, Math.PI * 2);
    ctx.fill();
    // Right eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx + r * 0.25, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx + r * 0.3, eyeY + 1, eyeR * 0.55, 0, Math.PI * 2);
    ctx.fill();

    // Nose (prominent, round, dark)
    ctx.fillStyle = '#1a1008';
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.2, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Nose highlight
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(cx - r * 0.04, cy + r * 0.17, r * 0.04, 0, Math.PI * 2);
    ctx.fill();

    // Little smile
    ctx.strokeStyle = '#5a3a20';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.25, r * 0.12, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Ears (tiny, poking through spines)
    ctx.fillStyle = '#8B6914';
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.55, cy - r * 0.35, r * 0.1, r * 0.15, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.55, cy - r * 0.35, r * 0.1, r * 0.15, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Feet (small, round)
    ctx.fillStyle = '#6b5240';
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.35, cy + r * 0.85, r * 0.18, r * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.35, cy + r * 0.85, r * 0.18, r * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawLujza(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size * 0.55;
    const r = size * 0.35;
    ctx.save();

    // Big fluffy tail (curving up behind, the defining feature)
    ctx.fillStyle = '#D2691E';
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.5, cy + r * 0.3);
    ctx.quadraticCurveTo(cx + r * 2.2, cy - r * 0.5, cx + r * 1.5, cy - r * 2.2);
    ctx.quadraticCurveTo(cx + r * 0.8, cy - r * 2.8, cx + r * 0.3, cy - r * 2.0);
    ctx.quadraticCurveTo(cx + r * 0.0, cy - r * 1.2, cx + r * 0.5, cy + r * 0.3);
    ctx.fill();
    // Tail highlight
    ctx.fillStyle = '#E8A050';
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.7, cy - r * 0.2);
    ctx.quadraticCurveTo(cx + r * 1.8, cy - r * 0.8, cx + r * 1.3, cy - r * 1.9);
    ctx.quadraticCurveTo(cx + r * 0.9, cy - r * 2.2, cx + r * 0.5, cy - r * 1.6);
    ctx.quadraticCurveTo(cx + r * 0.3, cy - r * 0.8, cx + r * 0.7, cy - r * 0.2);
    ctx.fill();

    // Ears (pointy)
    ctx.fillStyle = '#B8651A';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.5, cy - r * 1.0);
    ctx.lineTo(cx - r * 0.35, cy - r * 1.7);
    ctx.lineTo(cx - r * 0.05, cy - r * 1.0);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.05, cy - r * 1.0);
    ctx.lineTo(cx + r * 0.35, cy - r * 1.7);
    ctx.lineTo(cx + r * 0.5, cy - r * 1.0);
    ctx.fill();
    // Inner ear
    ctx.fillStyle = '#DEBB95';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.4, cy - r * 1.05);
    ctx.lineTo(cx - r * 0.33, cy - r * 1.45);
    ctx.lineTo(cx - r * 0.12, cy - r * 1.05);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.12, cy - r * 1.05);
    ctx.lineTo(cx + r * 0.33, cy - r * 1.45);
    ctx.lineTo(cx + r * 0.4, cy - r * 1.05);
    ctx.fill();

    // Head (round)
    ctx.fillStyle = '#CD853F';
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.6, r * 0.65, 0, Math.PI * 2);
    ctx.fill();

    // Body (oval)
    ctx.fillStyle = '#CD853F';
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.3, r * 0.55, r * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();

    // Belly (lighter)
    ctx.fillStyle = '#F5DEB3';
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.35, r * 0.35, r * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cheeks / muzzle (lighter area on face)
    ctx.fillStyle = '#EEDCB8';
    ctx.beginPath();
    ctx.ellipse(cx, cy - r * 0.4, r * 0.35, r * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (big, round)
    const eyeY = cy - r * 0.7;
    const eyeR = r * 0.16;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - r * 0.25, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx - r * 0.2, eyeY + 1, eyeR * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx + r * 0.25, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx + r * 0.3, eyeY + 1, eyeR * 0.55, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#1a1008';
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.4, r * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.32, r * 0.1, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Arms (little paws)
    ctx.fillStyle = '#B8651A';
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.65, cy + r * 0.1, r * 0.12, r * 0.2, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.65, cy + r * 0.1, r * 0.12, r * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Feet
    ctx.fillStyle = '#8B5A2B';
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.3, cy + r * 1.05, r * 0.2, r * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.3, cy + r * 1.05, r * 0.2, r * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawApple(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2 + 2;
    const r = size * 0.38;
    ctx.save();

    // Apple body
    ctx.fillStyle = '#e94560';
    ctx.beginPath();
    ctx.arc(cx - r * 0.25, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + r * 0.25, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = '#ff6b81';
    ctx.beginPath();
    ctx.arc(cx - r * 0.3, cy - r * 0.3, r * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.strokeStyle = '#5C4033';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 0.9);
    ctx.lineTo(cx + 1, cy - r * 1.5);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.35, cy - r * 1.3, r * 0.4, r * 0.15, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawPear(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2 + 2;
    const r = size * 0.35;
    ctx.save();

    // Pear body (wider bottom, narrow top)
    ctx.fillStyle = '#a8c256';
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 1.2);
    ctx.bezierCurveTo(cx - r * 0.5, cy - r * 0.8, cx - r * 1.3, cy + r * 0.2, cx - r * 1.0, cy + r * 1.0);
    ctx.bezierCurveTo(cx - r * 0.6, cy + r * 1.6, cx + r * 0.6, cy + r * 1.6, cx + r * 1.0, cy + r * 1.0);
    ctx.bezierCurveTo(cx + r * 1.3, cy + r * 0.2, cx + r * 0.5, cy - r * 0.8, cx, cy - r * 1.2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = '#c4d97a';
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.3, cy + r * 0.2, r * 0.25, r * 0.5, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.strokeStyle = '#5C4033';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 1.2);
    ctx.lineTo(cx + 1, cy - r * 1.8);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.3, cy - r * 1.6, r * 0.35, r * 0.13, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawOrange(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2 + 2;
    const r = size * 0.4;
    ctx.save();

    // Orange body
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = '#f5b041';
    ctx.beginPath();
    ctx.arc(cx - r * 0.25, cy - r * 0.25, r * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Tiny navel
    ctx.fillStyle = '#e67e22';
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.7, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.strokeStyle = '#5C4033';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 0.95);
    ctx.lineTo(cx, cy - r * 1.3);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.3, cy - r * 1.15, r * 0.35, r * 0.13, 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawBanana(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size * 0.48;
    ctx.save();

    // Banana 1 (back)
    ctx.fillStyle = '#e8c520';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.7, cy - r * 0.9);
    ctx.bezierCurveTo(cx - r * 1.3, cy + r * 0.2, cx - r * 0.5, cy + r * 1.3, cx + r * 0.4, cy + r * 0.9);
    ctx.bezierCurveTo(cx + r * 0.2, cy + r * 0.7, cx - r * 0.9, cy + r * 0.0, cx - r * 0.4, cy - r * 0.8);
    ctx.closePath();
    ctx.fill();

    // Banana 2 (middle)
    ctx.fillStyle = '#f4d03f';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.3, cy - r * 1.0);
    ctx.bezierCurveTo(cx - r * 1.0, cy + r * 0.3, cx - r * 0.2, cy + r * 1.4, cx + r * 0.7, cy + r * 0.8);
    ctx.bezierCurveTo(cx + r * 0.5, cy + r * 0.6, cx - r * 0.6, cy + r * 0.1, cx - r * 0.05, cy - r * 0.9);
    ctx.closePath();
    ctx.fill();

    // Banana 3 (front)
    ctx.fillStyle = '#f9e154';
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.15, cy - r * 0.95);
    ctx.bezierCurveTo(cx - r * 0.6, cy + r * 0.4, cx + r * 0.15, cy + r * 1.4, cx + r * 1.0, cy + r * 0.6);
    ctx.bezierCurveTo(cx + r * 0.8, cy + r * 0.4, cx - r * 0.2, cy + r * 0.2, cx + r * 0.35, cy - r * 0.85);
    ctx.closePath();
    ctx.fill();

    // Stem top
    ctx.fillStyle = '#8B6914';
    ctx.beginPath();
    ctx.arc(cx - r * 0.1, cy - r * 0.95, r * 0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawGrapes(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2 + 2;
    const r = size * 0.12;
    ctx.save();

    // Stem
    ctx.strokeStyle = '#5C4033';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 5);
    ctx.lineTo(cx, cy - r * 7);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(cx + r * 1.5, cy - r * 6.5, r * 1.5, r * 0.6, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Grape cluster (inverted pyramid — wide top, narrow bottom)
    const grapeColor = '#8e44ad';
    const highlight = '#a569bd';
    const positions = [
        // Top row (4 — widest)
        [-3, -3.5], [-1, -3.5], [1, -3.5], [3, -3.5],
        // Second row (3)
        [-2, -2], [0, -2], [2, -2],
        // Third row (3)
        [-2.5, -0.5], [-0.5, -0.5], [1.5, -0.5],
        // Fourth row (2)
        [-1, 1], [1, 1],
        // Bottom (1)
        [0, 2.5],
    ];

    for (const [dx, dy] of positions) {
        ctx.fillStyle = grapeColor;
        ctx.beginPath();
        ctx.arc(cx + dx * r, cy + dy * r, r * 0.95, 0, Math.PI * 2);
        ctx.fill();
        // Tiny highlight
        ctx.fillStyle = highlight;
        ctx.beginPath();
        ctx.arc(cx + dx * r - r * 0.2, cy + dy * r - r * 0.25, r * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

// Basket drawing functions
function drawBasketWoven(ctx, x, y, width, height) {
    ctx.save();
    ctx.translate(x, y);
    const topW = width;
    const botW = width * 0.75;
    const offsetX = (topW - botW) / 2;

    ctx.fillStyle = '#A0522D';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(topW, 0);
    ctx.lineTo(topW - offsetX, height); ctx.lineTo(offsetX, height);
    ctx.closePath(); ctx.fill();

    ctx.strokeStyle = '#CD853F'; ctx.lineWidth = 2;
    for (let row = height * 0.25; row < height; row += height * 0.2) {
        const progress = row / height;
        ctx.beginPath();
        ctx.moveTo(offsetX * progress, row);
        ctx.lineTo(topW - offsetX * progress, row);
        ctx.stroke();
    }
    for (let col = width * 0.15; col < width * 0.85; col += width * 0.15) {
        ctx.beginPath();
        ctx.moveTo(col, 0); ctx.lineTo(offsetX + (col / topW) * botW, height);
        ctx.stroke();
    }

    ctx.fillStyle = '#8B4513';
    ctx.beginPath(); ctx.roundRect(-3, -4, topW + 6, 8, 3); ctx.fill();
    ctx.restore();
}

function drawBasketBucket(ctx, x, y, width, height) {
    ctx.save();
    ctx.translate(x, y);
    const topW = width;
    const botW = width * 0.7;
    const offsetX = (topW - botW) / 2;

    // Wooden planks
    ctx.fillStyle = '#b5651d';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(topW, 0);
    ctx.lineTo(topW - offsetX, height); ctx.lineTo(offsetX, height);
    ctx.closePath(); ctx.fill();

    // Plank lines
    ctx.strokeStyle = '#8B4513'; ctx.lineWidth = 1;
    for (let col = width * 0.2; col < width * 0.9; col += width * 0.2) {
        ctx.beginPath();
        ctx.moveTo(col, 0); ctx.lineTo(offsetX + (col / topW) * botW, height);
        ctx.stroke();
    }

    // Metal bands
    ctx.strokeStyle = '#888'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(2, height * 0.3); ctx.lineTo(topW - 2, height * 0.3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(offsetX * 0.7 + 2, height * 0.7); ctx.lineTo(topW - offsetX * 0.7 - 2, height * 0.7); ctx.stroke();

    // Rim
    ctx.fillStyle = '#666';
    ctx.beginPath(); ctx.roundRect(-3, -4, topW + 6, 7, 3); ctx.fill();
    ctx.restore();
}

function drawBasketPot(ctx, x, y, width, height) {
    ctx.save();
    ctx.translate(x, y);
    const cx = width / 2;

    // Pot body (rounded)
    ctx.fillStyle = '#607d8b';
    ctx.beginPath();
    ctx.ellipse(cx, height * 0.6, width * 0.5, height * 0.55, 0, 0, Math.PI);
    ctx.lineTo(0, 0); ctx.lineTo(width, 0);
    ctx.closePath(); ctx.fill();

    // Shiny highlight
    ctx.fillStyle = '#78909c';
    ctx.beginPath();
    ctx.ellipse(cx - width * 0.15, height * 0.3, width * 0.12, height * 0.3, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Rim
    ctx.fillStyle = '#455a64';
    ctx.beginPath(); ctx.roundRect(-4, -5, width + 8, 9, 4); ctx.fill();

    // Handles
    ctx.strokeStyle = '#455a64'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(-5, height * 0.3, 6, -0.5, 1.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(width + 5, height * 0.3, 6, 1.6, 3.6); ctx.stroke();
    ctx.restore();
}

const BASKET_DRAWERS = {
    woven: drawBasketWoven,
    bucket: drawBasketBucket,
    pot: drawBasketPot,
};

function drawBasket(ctx, x, y, width, height) {
    (BASKET_DRAWERS[basketMode] || drawBasketWoven)(ctx, x, y, width, height);
}

function drawHeart(ctx, x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size * 0.25;
    ctx.save();
    ctx.fillStyle = '#e94560';
    ctx.beginPath();
    ctx.moveTo(cx, cy + r * 1.5);
    ctx.bezierCurveTo(cx - r * 2.5, cy - r * 0.5, cx - r * 1.2, cy - r * 2.2, cx, cy - r * 0.8);
    ctx.bezierCurveTo(cx + r * 1.2, cy - r * 2.2, cx + r * 2.5, cy - r * 0.5, cx, cy + r * 1.5);
    ctx.fill();
    ctx.restore();
}
