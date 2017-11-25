export default class Coords {
    constructor(row: number, column: number) {
        this._row = row;
        this._column = column;
    }

    private _row: number;

    get row(): number {
        return this._row;
    }

    set row(value: number) {
        this._row = value;
    }

    private _column: number;

    get column(): number {
        return this._column;
    }

    set column(value: number) {
        this._column = value;
    }

    clone(): Coords {
        return new Coords(this._row, this._column)
    }

    equals(obj: Coords): boolean {
        return this.row == obj.row && this.column == obj.column;
    }
}
