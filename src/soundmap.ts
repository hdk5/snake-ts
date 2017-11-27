declare function require(path: string): any;

export default class Soundmap {
    static eat: HTMLAudioElement = new Audio();
    static death: HTMLAudioElement = new Audio();
}

Soundmap.eat.src = require("./soundmap/eat.mp3");
Soundmap.death.src = require("./soundmap/death.mp3");
