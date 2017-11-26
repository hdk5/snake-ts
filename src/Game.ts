import Snake from "./Snake";
import Coords from "./Coords";
import Direction from "./Direction";
import Field from "./Field";
import GamePreset from "./GamePreset";
import CanvasHelper from "./CanvasHelper";
import Util from "./Util";
import AiHelper from "./AiHelper";
import HtmlHelper from "./HtmlHelper";
import AudioHelper from "./AudioHelper";
import ScoreBoardHelper from "./ScoreBoardHelper";

export default class Game {
    static readonly CELL_SIZE: number = 25;
    private _lastFrameTimeStamp: number;
    private _snakes: Array<Snake>;
    private _field: Field;
    private _food: Coords;
    private _frameId: number;
    private _canvasHelper: CanvasHelper;
    private _htmlHelper: HtmlHelper;
    private _preset: GamePreset;

    constructor(htmlRoot: HTMLElement) {
        this._htmlHelper = new HtmlHelper(this, htmlRoot);
        this._canvasHelper = new CanvasHelper(this);
        // this._audioHelper = new AudioHelper(this);
        this._htmlHelper.gameInit();

        this.canvas.tabIndex = 0;
        this.canvas.onkeydown = ev => {
            switch (ev.keyCode) {
                case 37:
                    this._player.direction = Direction.Left;
                    break;
                case 38:
                    this._player.direction = Direction.Up;
                    break;
                case 39:
                    this._player.direction = Direction.Right;
                    break;
                case 40:
                    this._player.direction = Direction.Down;
                    break;
            }
        };

    }

    get presetName(): string {
        return this._preset.name;
    }

    private _score: number;

    get score(): number {
        return this._score;
    }

    get htmlRoot(): HTMLElement {
        return this._htmlHelper.root;
    }

    private _difficulty: number;

    get difficulty(): number {
        return this._difficulty;
    }

    set difficulty(value: number) {
        this._difficulty = value;
    }

    private _playerName: string;

    get playerName(): string {
        return this._playerName;
    }

    get canvas(): HTMLCanvasElement {
        return this._htmlHelper.canvas;
    };

    private get _player(): Snake {
        return this._snakes[0]
    }

    private get _enemies(): Array<Snake> {
        return this._snakes.slice(1);
    }

    static checkCollisions(self: Array<Coords>, other: Array<Coords>): Coords {
        for (let i = 0; i < self.length; ++i) {
            for (let j = 0; j < other.length; ++j) {
                if (self[i].equals(other[j])) {
                    return self[i].clone();
                }
            }
        }
        return null;
    }

    gameOver() {
        ScoreBoardHelper.addScore(
            this.presetName,
            {
                score: this._score,
                name: this.playerName,
                date: new Date()
            }
        );
        this._htmlHelper.gameOver();
    }

    initGame(difficulty: number, init: GamePreset, playerName: string) {
        this._playerName = playerName;
        this._htmlHelper.gameProgress();
        this._difficulty = difficulty;
        this._field = init.field.clone();
        this._snakes = Util.arrayClone(init.snakes);
        this._food = this.createFood();
        this._score = 0;
        this._preset = init;

        this.canvas.focus();

        cancelAnimationFrame(this._frameId);
        this._lastFrameTimeStamp = performance.now();
        this._frameId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    private createFood(): Coords {
        let cells: Array<Coords> = [];
        for (let i = 0; i < this._field.height; ++i) {
            for (let j = 0; j < this._field.width; ++j) {
                cells.push(new Coords(i, j));
            }
        }

        cellLoop: for (let i = cells.length - 1; i >= 0; --i) {
            for (let block of this._field.blocks) {
                if (cells[i].equals(block)) {
                    cells.splice(i, 1);
                    continue cellLoop;
                }
            }

            for (let snake of this._snakes) {
                for (let block of snake.snake) {
                    if (cells[i].equals(block)) {
                        cells.splice(i, 1);
                        continue cellLoop;
                    }
                }
            }
        }

        return Util.choice(cells);

    }

    private gameLoop(frameTimeStamp: number) {
        if (frameTimeStamp - this._lastFrameTimeStamp < 1000 / this._difficulty) {
            requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }
        this._lastFrameTimeStamp = frameTimeStamp;

        this._htmlHelper.gameScore = this._score;

        this._canvasHelper.drawField(this._field);
        this._canvasHelper.drawFood(this._food);
        this._canvasHelper.drawSnake(this._player, CanvasHelper.SnakeType.Player);
        for (let enemy of this._enemies) {
            this._canvasHelper.drawSnake(enemy, CanvasHelper.SnakeType.Enemy);
        }

        for (let snake of this._snakes.filter(value => value.alive)) {
            let obstacles = [];
            obstacles.push(...this._field.blocks);
            for (let enemy of this._snakes.filter(value => value != snake)) {
                obstacles.push(...enemy.snake);
            }
            obstacles.push(...snake.snake.slice(1));
            if (snake != this._player) {
                snake.direction = AiHelper.decide(snake.snake[0], this._food, obstacles, this._field.height, this._field.width);
            }
            let coords = Game.checkCollisions([snake.snake[0]], obstacles);
            if (coords) {
                AudioHelper.playDeathSound();
                snake.alive = false;
                if (snake != this._player) {
                    this._score += this._difficulty * 10;
                }
                continue;
            }
            snake.move();
            if (snake.snake[0].equals(this._food)) {
                AudioHelper.playEatSound();
                snake.feed();
                this._food = this.createFood();
                if (snake == this._player) {
                    this._score += this._difficulty;
                }
                break;
            }
        }

        if (this._player.alive) {
            this._frameId = requestAnimationFrame(this.gameLoop.bind(this));
        } else {
            this.gameOver();
        }
    }
}

