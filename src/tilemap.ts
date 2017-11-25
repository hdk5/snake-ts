declare function require(path: string): any;

class Tilemap {
    static food: HTMLImageElement = new Image();
    static fieldEmpty: HTMLImageElement = new Image();
    static fieldWall: HTMLImageElement = new Image();
    static enemyHead: HTMLImageElement = new Image();
    static enemyTail: HTMLImageElement = new Image();
    static enemyStraight: HTMLImageElement = new Image();
    static enemyRotate: HTMLImageElement = new Image();
    static playerHead: HTMLImageElement = new Image();
    static playerTail: HTMLImageElement = new Image();
    static playerStraight: HTMLImageElement = new Image();
    static playerRotate: HTMLImageElement = new Image();
}

Tilemap.food.src = require("./tilemap/food.png");
Tilemap.fieldEmpty.src = require("./tilemap/field_empty.png");
Tilemap.fieldWall.src = require("./tilemap/field_wall.png");
Tilemap.enemyHead.src = require("./tilemap/enemy_head.png");
Tilemap.enemyTail.src = require("./tilemap/enemy_tail.png");
Tilemap.enemyStraight.src = require("./tilemap/enemy_straight.png");
Tilemap.enemyRotate.src = require("./tilemap/enemy_rotate.png");
Tilemap.playerHead.src = require("./tilemap/player_head.png");
Tilemap.playerTail.src = require("./tilemap/player_tail.png");
Tilemap.playerStraight.src = require("./tilemap/player_straight.png");
Tilemap.playerRotate.src = require("./tilemap/player_rotate.png");

export default Tilemap