import Snake from "./Snake";
import Direction from "./Direction";
import Game from "./Game";
import Coords from "./Coords";
import Util from "./Util";
import tilemap from "./tilemap";
import Field from "./Field";

enum SnakeType { Player, Enemy }

export default class CanvasHelper {
    static SnakeType = SnakeType;
    private _game: Game;

    constructor(game: Game) {
        this._game = game;
    }

    private get _canvas() {
        return this._game.canvas;
    }

    drawFood(point: Coords): void {
        this.drawCell(tilemap.food, point.column, point.row, 0);
    }

    drawField(field: Field): void {
        this._canvas.width = field.width * Game.CELL_SIZE;
        this._canvas.height = field.height * Game.CELL_SIZE;
        for (let i = 0; i < field.width; ++i) {
            for (let j = 0; j < field.height; ++j) {
                this.drawCell(tilemap.fieldEmpty, i, j, 0);
            }
        }
        for (let block of field.blocks) {
            this.drawCell(tilemap.fieldWall, block.column, block.row, 0);
        }
    }

    drawSnake(snake: Snake, type: SnakeType): void {
        let to: Direction, from: Direction;

        for (let i = 0; i < snake.snake.length; ++i) {
            let image: HTMLImageElement, canvasX, canvasY, angle;
            if (i == 0) {
                let head = snake.snake[i];
                from = snake.direction.reverse();
                switch (from) {
                    case Direction.Down:
                        angle = 0;
                        break;
                    case Direction.Left:
                        angle = Math.PI / 2;
                        break;
                    case Direction.Up:
                        angle = Math.PI;
                        break;
                    case Direction.Right:
                        angle = Math.PI * 3 / 2;
                        break;
                }
                image = tilemap.playerHead;

                canvasX = head.column;
                canvasY = head.row;
            } else if (i == snake.snake.length - 1) {
                let tail = snake.snake[i];
                to = from.reverse();
                switch (to) {
                    case Direction.Up:
                        angle = 0;
                        break;
                    case Direction.Right:
                        angle = Math.PI / 2;
                        break;
                    case Direction.Down:
                        angle = Math.PI;
                        break;
                    case Direction.Left:
                        angle = Math.PI * 3 / 2;
                        break;
                }
                image = tilemap.playerTail;

                canvasX = tail.column;
                canvasY = tail.row;
            } else {
                to = from.reverse();
                let body = snake.snake[i];
                let next = snake.snake[i + 1];
                if (body.row == next.row) {
                    if (Util.mod(body.column + 1, snake.columns) == next.column) {
                        from = Direction.Right;
                    } else if (Util.mod(body.column - 1, snake.columns) == next.column) {
                        from = Direction.Left;
                    }
                } else if (body.column == next.column) {
                    if (Util.mod(body.row + 1, snake.rows) == next.row) {
                        from = Direction.Down;
                    } else if (Util.mod(body.row - 1, snake.rows) == next.row) {
                        from = Direction.Up;
                    }
                }
                if ((from == Direction.Left && to == Direction.Right)
                    || (from == Direction.Right && to == Direction.Left)) {
                    image = tilemap.playerStraight;
                    angle = Math.PI / 2;
                } else if ((from == Direction.Up && to == Direction.Down)
                    || (from == Direction.Down && to == Direction.Up)) {
                    image = tilemap.playerStraight;
                    angle = 0;
                } else if ((from == Direction.Up && to == Direction.Right)
                    || (from == Direction.Right && to == Direction.Up)) {
                    image = tilemap.playerRotate;
                    angle = 0;
                } else if ((from == Direction.Right && to == Direction.Down)
                    || (from == Direction.Down && to == Direction.Right)) {
                    image = tilemap.playerRotate;
                    angle = Math.PI / 2;
                }
                else if ((from == Direction.Down && to == Direction.Left)
                    || (from == Direction.Left && to == Direction.Down)) {
                    image = tilemap.playerRotate;
                    angle = Math.PI;
                }
                else if ((from == Direction.Left && to == Direction.Up)
                    || (from == Direction.Up && to == Direction.Left)) {
                    image = tilemap.playerRotate;
                    angle = Math.PI * 3 / 2;
                }


                canvasX = body.column;
                canvasY = body.row;
            }
            // }

            switch (image) {
                case tilemap.playerHead:
                    switch (type) {
                        case SnakeType.Player:
                            image = tilemap.playerHead;
                            break;
                        case SnakeType.Enemy:
                            image = tilemap.enemyHead;
                            break
                    }
                    break;
                case tilemap.playerRotate:
                    switch (type) {
                        case SnakeType.Player:
                            image = tilemap.playerRotate;
                            break;
                        case SnakeType.Enemy:
                            image = tilemap.enemyRotate;
                            break
                    }
                    break;
                case tilemap.playerStraight:
                    switch (type) {
                        case SnakeType.Player:
                            image = tilemap.playerStraight;
                            break;
                        case SnakeType.Enemy:
                            image = tilemap.enemyStraight;
                            break
                    }
                    break;
                case tilemap.playerTail:
                    switch (type) {
                        case SnakeType.Player:
                            image = tilemap.playerTail;
                            break;
                        case SnakeType.Enemy:
                            image = tilemap.enemyTail;
                            break
                    }
                    break;
            }

            this.drawCell(image, canvasX, canvasY, angle);
        }

    };

    drawCell(image: HTMLImageElement, canvasX: number, canvasY: number, angle: number): void {
        let ctx: CanvasRenderingContext2D = this._canvas.getContext('2d');
        ctx.save();
        ctx.translate(canvasX * Game.CELL_SIZE, canvasY * Game.CELL_SIZE);
        ctx.translate(Game.CELL_SIZE / 2, Game.CELL_SIZE / 2);
        ctx.rotate(angle);
        ctx.drawImage(
            image,
            -Game.CELL_SIZE / 2, -Game.CELL_SIZE / 2, Game.CELL_SIZE, Game.CELL_SIZE
        );
        ctx.restore();

    }
}
