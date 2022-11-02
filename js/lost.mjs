import Scene from './Scene.mjs';

let BODY, WIDTH, HEIGHT
let LAST = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    WIDTH = window.innerWidth - 32;
    HEIGHT = window.innerHeight - 32;
    new Scene(WIDTH, HEIGHT);
});
