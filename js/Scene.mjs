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

    sprite.on('mouseover', () => {
        sprite.tint = 0xFB3050;
    });
    sprite.on('mouseleave', () => {
        sprite.tint = 0xFFFFFF;
    });

    app.stage.addChild(sprite);
    return sprite;
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

const makeRoom = function() {
    const g = new PIXI.Graphics();
    g.drawRect(0, 0, 100, 100);
};

export default class Scene {
    constructor(name, w, h) {
        const container = document.querySelector(`.container.${name}`);
        this.light = 0;

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

        makeRoom();

        /*let invisible = grid.filter(function(x) {
            return !x.visible;
        }).sort((a, b) => a.y - b.y);*/

        let elapsed = 0.0;
        let i = 0;
        let time = 0;
        app.ticker.add((delta) => {
            time += 1 / 60;

            elapsed += delta;

            /*if (i >= invisible.length) {
                i = 0;
            }*/

            /*if (Math.round(elapsed) % 2 === 0) {
                invisible[i].visible = true;
            } else {
                invisible[i].visible = false;
            }*/
            
            this.light = Math.cos(elapsed / 50);

            //console.log(delta);
            //sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
            //sprite.y = 100.0 + Math.sin(elapsed/50.0) * 100.0;

            i += 1;
        });
    }

    resize(w, h) {
        this.app.renderer.resize(w, h);
    }
}
