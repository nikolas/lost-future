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

const makeBlock = function(app, i, j) {
    if (Math.random() > 0.5) {
        const img = getRandomImage(IMAGES);
        const sprite = PIXI.Sprite.from('./img/' + img);
        sprite.texture.on('update', (e) => {
            const aspectRatio = e.width / e.height;
            sprite.height /= aspectRatio;
        });
        sprite.x = i;
        sprite.y = j;
        sprite.width = 80;
        sprite.height = 80;
        sprite.anchor.set(0.5);
        sprite.interactive = true;
        sprite.cursor = 'pointer';
        sprite.on('pointerdown', () => {
            console.log('pointerdown');
        });

        sprite.on('mouseover', () => {
            sprite.tint = 0xFB3050;
        });
        sprite.on('mouseleave', () => {
            sprite.tint = 0xFFFFFF;
        });

        app.stage.addChild(sprite);
        return sprite;
    }

    const g = new PIXI.Graphics();
    g.interactive = true;
    g.cursor = 'pointer';
    g.on('pointerdown', (event) => {
        console.log('g pointerdown');
    });
    g.lineStyle(0);
    g.beginFill(0x650A5A, 1);
    g.drawCircle(Math.random() * WIDTH, j, 28 + (j/10));
    g.endFill();
    app.stage.addChild(g);
    return g;
};

const makeGrid = function(app) {
    for (let i = 0; i < WIDTH; i += 80) {
        for (let j = 0; j < HEIGHT; j += 80) {
            makeBlock(app, i, j);
        }
    }
};

class Scene {
    constructor(w, h) {
        const app = new PIXI.Application({
            antialias: true,
            backgroundAlpha: 0,
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
            //sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
            //sprite.y = 100.0 + Math.sin(elapsed/50.0) * 100.0;
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    WIDTH = window.innerWidth - 32;
    HEIGHT = window.innerHeight - 32;
    new Scene(WIDTH, HEIGHT);
});
