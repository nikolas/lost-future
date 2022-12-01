import Scene from './Scene.mjs';

let BODY, WIDTH, HEIGHT;
let scenes = [];

addEventListener('resize', (e) => {
    WIDTH = window.innerWidth - 32;
    HEIGHT = window.innerHeight - 32;
    scenes.forEach((scene) => {
        scene.resize(WIDTH, HEIGHT);
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    WIDTH = window.innerWidth - 32;
    HEIGHT = window.innerHeight - 32;

    scenes.push(new Scene('left', WIDTH, HEIGHT));
    //scenes.push(new Scene('right', WIDTH, HEIGHT));
    //scenes.push(new Scene('top', WIDTH, HEIGHT));
    //scenes.push(new Scene('bottom', WIDTH, HEIGHT));
});
