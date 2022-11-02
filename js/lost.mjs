import Scene from './Scene.mjs';

let BODY, WIDTH, HEIGHT;
let scene = null;

addEventListener('resize', (e) => {
    WIDTH = window.innerWidth - 32;
    HEIGHT = window.innerHeight - 32;
    scene.resize(WIDTH, HEIGHT);
});

document.addEventListener('DOMContentLoaded', (event) => {
    WIDTH = window.innerWidth - 32;
    HEIGHT = window.innerHeight - 32;
    scene = new Scene(WIDTH, HEIGHT);
});
