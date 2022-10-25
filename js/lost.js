let BODY, CTX, WIDTH, HEIGHT
let LAST = 0;

const IMAGES = [
    '1.jpg',
    '2.jpg',
    // '3.jpg',
    '4.jpg',
    '5.jpg',
    'afterstep.jpg',
    'openttd.jpg'
];

const showImage = function(imgFile, ctx, w, h) {
    const img = new Image();
    img.src = './img/' + imgFile;
    img.onload = function() {
        console.log('img', img.width);
        ctx.drawImage(
            img,
            Math.random() * w,
            Math.random() * h,
            Math.min(img.width, w),
            Math.min(img.height, h)
        );
    };
    return img;
};

const getRandomColor = function() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    return `rgb(${r}, ${g}, ${b})`;
};

const makeBlock = function(ctx, i, j) {
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'black';
    ctx.fillStyle = getRandomColor();
    ctx.fillRect(i+5, j+5, 10, 10);
};

const updateBg = function(ctx) {
    for (let i = 0; i < WIDTH; i += 20) {
        for (let j = 0; j < HEIGHT; j += 20) {
            makeBlock(ctx, i, j);
        }
    }
    BODY.style.backgroundColor = getRandomColor();
};

const makeGrid = function(ctx) {
};

const initCanvas = function(ctx) {
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
};

const render = function(now) {
    if (!LAST || now - LAST >= 200) {
        LAST = now;
        console.log(now);

        updateBg(CTX);
    }

    window.requestAnimationFrame(render);
};

document.addEventListener('DOMContentLoaded', (event) => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    makeGrid(document.getElementById('grid'), WIDTH);

    BODY = document.querySelector('body');

    const c = document.getElementById('scene');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    CTX = c.getContext('2d');
    initCanvas(CTX);

    makeGrid(CTX);

    IMAGES.forEach(function(img) {
        showImage(img, CTX, WIDTH, HEIGHT);
    });

    window.requestAnimationFrame(render);
});
