import * as PIXI from './lib/pixi.min.mjs';

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

const makeBlock = function(app, i, j, width) {
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
    g.visible = false;
    g.lineStyle(0);
    g.beginFill(0x650A5A, 1);
    g.drawCircle(Math.random() * width, j, 28 + (j/10));
    g.endFill();
    app.stage.addChild(g);
    return g;
};

const makeGrid = function(app, width, height) {
    let grid = [];

    for (let i = 0; i < width; i += 80) {
        for (let j = 0; j < height; j += 80) {
            grid.push(makeBlock(app, i, j, width));
        }
    }

    return grid;
};

export default class Scene {
    constructor(w, h) {
        const container = document.querySelector('.container');

        const app = new PIXI.Application({
            antialias: true,
            backgroundAlpha: 0,
            width: w,
            height: h
        });
        this.app = app;
        container.appendChild(app.view);

        const sprite = makeBlock(app, 1, 2);
        const grid = makeGrid(app, w, h);

        const invisible = grid.filter(function(x) {
            return !x.visible;
        });

        let elapsed = 0.0;
        app.ticker.add((delta) => {
            elapsed += delta;

            if (Math.round(elapsed) % 2 === 0) {
                const idx = Math.floor(Math.random() * invisible.length);
                invisible[idx].visible = true;
            } else {
                const idx2 = Math.floor(Math.random() * invisible.length);
                invisible[idx2].visible = false;
            }

            //console.log(delta);
            //sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
            //sprite.y = 100.0 + Math.sin(elapsed/50.0) * 100.0;
        });
    }

    resize(w, h) {
        this.app.renderer.resize(w, h);
    }
}
