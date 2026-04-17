/**
 * Pixel-art sprites for Oto (hedgehog) and Lujza (squirrel)
 * Based on the illustrated characters from the textbook.
 *
 * Oto: round brown hedgehog, dark spines on top/back, light tan belly/face
 * Lujza: orange-brown squirrel, big bushy tail curling up, lighter belly
 */

function drawOto(ctx, x, y, size) {
    const s = size / 16;
    ctx.save();
    ctx.translate(x, y);

    // Spines (dark brown, rounded on top)
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(4*s, 1*s, 8*s, s);
    ctx.fillRect(3*s, 2*s, 10*s, s);
    ctx.fillRect(2*s, 3*s, 12*s, s);
    ctx.fillRect(2*s, 4*s, 12*s, s);
    ctx.fillRect(2*s, 5*s, 12*s, s);
    ctx.fillRect(3*s, 6*s, 11*s, s);
    ctx.fillRect(3*s, 7*s, 11*s, s);

    // Spine highlights (lighter brown streaks)
    ctx.fillStyle = '#6b5240';
    ctx.fillRect(5*s, 2*s, s, s);
    ctx.fillRect(8*s, 2*s, s, s);
    ctx.fillRect(11*s, 2*s, s, s);
    ctx.fillRect(3*s, 4*s, s, s);
    ctx.fillRect(6*s, 3*s, s, s);
    ctx.fillRect(10*s, 4*s, s, s);
    ctx.fillRect(4*s, 6*s, s, s);
    ctx.fillRect(9*s, 5*s, s, s);
    ctx.fillRect(12*s, 6*s, s, s);

    // Body (warm brown)
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(3*s, 8*s, 10*s, 3*s);
    ctx.fillRect(4*s, 11*s, 8*s, 2*s);

    // Face/belly (light tan)
    ctx.fillStyle = '#F5DEB3';
    ctx.fillRect(5*s, 8*s, 6*s, 4*s);

    // Eyes (big, friendly)
    ctx.fillStyle = '#fff';
    ctx.fillRect(5*s, 8*s, 2*s, 2*s);
    ctx.fillRect(9*s, 8*s, 2*s, 2*s);
    ctx.fillStyle = '#000';
    ctx.fillRect(6*s, 8.5*s, s, s);
    ctx.fillRect(10*s, 8.5*s, s, s);

    // Nose (round, dark)
    ctx.fillStyle = '#2c1810';
    ctx.fillRect(7*s, 10*s, 2*s, 1.5*s);

    // Mouth (little smile)
    ctx.fillStyle = '#5a3a20';
    ctx.fillRect(6.5*s, 11.5*s, s, 0.5*s);
    ctx.fillRect(8.5*s, 11.5*s, s, 0.5*s);

    // Feet (little round paws)
    ctx.fillStyle = '#6b5240';
    ctx.fillRect(4*s, 13*s, 3*s, 2*s);
    ctx.fillRect(9*s, 13*s, 3*s, 2*s);

    // Toes
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(4*s, 14.5*s, s, 0.5*s);
    ctx.fillRect(6*s, 14.5*s, s, 0.5*s);
    ctx.fillRect(9*s, 14.5*s, s, 0.5*s);
    ctx.fillRect(11*s, 14.5*s, s, 0.5*s);

    ctx.restore();
}

function drawLujza(ctx, x, y, size) {
    const s = size / 16;
    ctx.save();
    ctx.translate(x, y);

    // Bushy tail (curving up and over, big and fluffy)
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(12*s, 5*s, 3*s, 2*s);
    ctx.fillRect(13*s, 3*s, 3*s, 3*s);
    ctx.fillRect(14*s, 1*s, 2*s, 3*s);
    ctx.fillRect(13*s, 0, 2*s, 2*s);
    ctx.fillRect(12*s, 0, 2*s, s);
    // Tail highlight
    ctx.fillStyle = '#E8A050';
    ctx.fillRect(14*s, 2*s, s, 2*s);
    ctx.fillRect(13*s, 4*s, s, s);

    // Ears (pointy, tufted)
    ctx.fillStyle = '#B8651A';
    ctx.fillRect(4*s, 0, 2*s, 3*s);
    ctx.fillRect(9*s, 0, 2*s, 3*s);
    // Ear tufts
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(4*s, 0, s, s);
    ctx.fillRect(10*s, 0, s, s);

    // Head
    ctx.fillStyle = '#CD853F';
    ctx.fillRect(4*s, 2*s, 7*s, 5*s);
    ctx.fillRect(3*s, 3*s, 9*s, 3*s);

    // Body
    ctx.fillStyle = '#CD853F';
    ctx.fillRect(4*s, 7*s, 8*s, 5*s);
    ctx.fillRect(3*s, 8*s, 10*s, 3*s);

    // Belly (lighter)
    ctx.fillStyle = '#F5DEB3';
    ctx.fillRect(5*s, 8*s, 5*s, 3*s);

    // Face (lighter muzzle area)
    ctx.fillStyle = '#F5DEB3';
    ctx.fillRect(6*s, 4*s, 3*s, 3*s);

    // Eyes (big, bright)
    ctx.fillStyle = '#fff';
    ctx.fillRect(5*s, 3*s, 2*s, 2*s);
    ctx.fillRect(8*s, 3*s, 2*s, 2*s);
    ctx.fillStyle = '#000';
    ctx.fillRect(6*s, 3.5*s, s, s);
    ctx.fillRect(9*s, 3.5*s, s, s);

    // Nose
    ctx.fillStyle = '#2c1810';
    ctx.fillRect(7*s, 5.5*s, 1.5*s, s);

    // Little smile
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(6.5*s, 6.5*s, s, 0.5*s);
    ctx.fillRect(8*s, 6.5*s, s, 0.5*s);

    // Arms (little paws at sides)
    ctx.fillStyle = '#B8651A';
    ctx.fillRect(2*s, 8*s, 2*s, 2*s);
    ctx.fillRect(11*s, 8*s, 2*s, 2*s);

    // Feet
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(4*s, 12*s, 3*s, 2*s);
    ctx.fillRect(8*s, 12*s, 3*s, 2*s);

    // Toes
    ctx.fillStyle = '#6b4020';
    ctx.fillRect(4*s, 13.5*s, s, 0.5*s);
    ctx.fillRect(6*s, 13.5*s, s, 0.5*s);
    ctx.fillRect(8*s, 13.5*s, s, 0.5*s);
    ctx.fillRect(10*s, 13.5*s, s, 0.5*s);

    ctx.restore();
}

function drawApple(ctx, x, y, size) {
    const s = size / 12;
    ctx.save();
    ctx.translate(x, y);

    // Apple body (red)
    ctx.fillStyle = '#e94560';
    ctx.fillRect(3*s, 4*s, 6*s, 6*s);
    ctx.fillRect(2*s, 5*s, 8*s, 4*s);
    ctx.fillRect(4*s, 3*s, 4*s, s);
    ctx.fillRect(3*s, 10*s, 6*s, s);

    // Stem (brown)
    ctx.fillStyle = '#5C4033';
    ctx.fillRect(5.5*s, 1*s, s, 3*s);

    // Leaf (green)
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(6.5*s, 2*s, 2*s, s);
    ctx.fillRect(7.5*s, 1*s, s, s);

    // Highlight
    ctx.fillStyle = '#ff6b81';
    ctx.fillRect(4*s, 5*s, s, 2*s);

    ctx.restore();
}

function drawBasket(ctx, x, y, width, height) {
    ctx.save();
    ctx.translate(x, y);

    // Basket body (woven brown)
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(0, height * 0.3, width, height * 0.7);

    // Lighter weave stripes
    ctx.fillStyle = '#CD853F';
    for (let i = 0; i < width; i += 6) {
        ctx.fillRect(i, height * 0.3, 3, height * 0.7);
    }

    // Rim
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(-2, height * 0.25, width + 4, height * 0.1);

    // Opening (top, darker)
    ctx.fillStyle = '#5C3A1E';
    ctx.fillRect(2, height * 0.3, width - 4, height * 0.15);

    ctx.restore();
}

function drawHeart(ctx, x, y, size) {
    const s = size / 8;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#e94560';
    ctx.fillRect(1*s, 0, 2*s, s);
    ctx.fillRect(5*s, 0, 2*s, s);
    ctx.fillRect(0, s, 4*s, s);
    ctx.fillRect(4*s, s, 4*s, s);
    ctx.fillRect(0, 2*s, 8*s, s);
    ctx.fillRect(0, 3*s, 8*s, s);
    ctx.fillRect(s, 4*s, 6*s, s);
    ctx.fillRect(2*s, 5*s, 4*s, s);
    ctx.fillRect(3*s, 6*s, 2*s, s);
    ctx.restore();
}
