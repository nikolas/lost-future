let CTX;
let BODY, WIDTH, HEIGHT
let LAST = 0;

const IMAGES = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    'afterstep.jpg',
    'openttd.jpg'
];

const getRandomColor = function() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    const a = 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const getRandomImage = function(images) {
    return images[
        Math.floor(Math.random() * images.length)];
};

const handleSpriteClick = function(e) {
    console.log('clicked!');
};

const makeBlock = function(app, i, j) {
    if (Math.random() > 0.5) {
        const img = getRandomImage(IMAGES);
        const sprite = PIXI.Sprite.from('./img/' + img);
        console.log(sprite);
        sprite.x = i;
        sprite.y = j;
        sprite.width = 60;
        sprite.height = 60;
        sprite.interactive = true;
        sprite.on('tap', (event) => {
            console.log('hi');
        });
        app.stage.addChild(sprite);
        return sprite;
    }

    const g = new PIXI.Graphics();
    g.interactive = true;
    g.lineStyle(0);
    g.beginFill(0x650A5A, 1);
    g.drawCircle(i, j, 50);
    g.endFill();
    app.stage.addChild(g);
    return g;

    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.fillStyle = getRandomColor();

    let blockSize = 40;
    blockSize += Math.random() * 40;

    ctx.fillRect(i+10, j+10, blockSize, blockSize);
};

const updateBg = function(ctx) {
    for (let i = 0; i < WIDTH; i += 80) {
        for (let j = 0; j < HEIGHT; j += 80) {
            makeBlock(ctx, i, j);
        }
    }
    BODY.style.backgroundColor = getRandomColor();
};

const makeGrid = function(app) {
    for (let i = 0; i < WIDTH; i += 80) {
        for (let j = 0; j < HEIGHT; j += 80) {
            makeBlock(app, i, j);
        }
    }
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

class Scene {
    constructor(w, h) {
        const app = new PIXI.Application({
            width: w,
            height: h
        });
        this.app = app;
        document.body.appendChild(app.view);
        const sprite = makeBlock(app, 1, 2);
        makeGrid(app);

        let elapsed = 0.0;
        app.ticker.add((delta) => {
            elapsed += delta;
            sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
            sprite.y = 100.0 + Math.sin(elapsed/50.0) * 100.0;
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    WIDTH = window.innerWidth - 16;
    HEIGHT = window.innerHeight - 16;
    new Scene(WIDTH, HEIGHT);
});
