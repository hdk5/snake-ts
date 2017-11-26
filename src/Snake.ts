import Direction from "./Direction"
import Coords from "./Coords";
import Util from "./Util";

export default class Snake {
    private _feed: boolean = false;
    private _nextDirection: Direction = null;

    constructor(fieldHeight: number, fieldWidth: number, initial: Array<Coords>, direction: Direction) {
        this._rows = fieldHeight;
        this._columns = fieldWidth;
        this._direction = direction;
        this._snake = initial;
    }

    private _rows: number;

    get rows(): number {
        return this._rows;
    }

    private _columns: number;

    get columns(): number {
        return this._columns;
    }

    private _snake: Array<Coords> = [];

    get snake(): Array<Coords> {
        return this._snake;
    }

    private _alive: boolean = true;

    get alive(): boolean {
        return this._alive;
    }

    set alive(value: boolean) {
        this._alive = value;
    }

    private _direction: Direction;

    get direction(): Direction {
        return this._direction;
    }

    set direction(value: Direction) {
        if (this._snake.length > 1) {
            if (value === Direction.Right && this._direction === Direction.Left) {
                return;
            }
            if (value === Direction.Left && this._direction === Direction.Right) {
                return;
            }
            if (value === Direction.Up && this._direction === Direction.Down) {
                return;
            }
            if (value === Direction.Down && this._direction === Direction.Up) {
                return;
            }
        }
        this._nextDirection = value;
    }

    move(): void {
        let direction = this._nextDirection != null ? this._nextDirection : this.direction;
        let head = this._snake[0].clone();
        switch (direction) {
            case Direction.Left:
                head.column = Util.mod(head.column - 1, this._columns);
                break;
            case Direction.Right:
                head.column = Util.mod(head.column + 1, this._columns);
                break;
            case Direction.Up:
                head.row = Util.mod(head.row - 1, this._rows);
                break;
            case Direction.Down:
                head.row = Util.mod(head.row + 1, this._rows);
                break;
        }
        if (!this._feed) {
            this._snake.pop();
        }
        this._snake.unshift(head);
        this._direction = direction;
        this._nextDirection = null;
        this._feed = false;
    }

    feed(): void {
        this._feed = true;
    }

    clone(): Snake {
        return new Snake(this._rows, this._columns, Util.arrayClone(this._snake), this._direction);
    }
}