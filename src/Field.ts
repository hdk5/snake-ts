import Coords from "./Coords";
import Util from "./Util";

export default class Field {
    constructor(height: number, width: number, blocks: Array<Coords>) {
        this._width = width;
        this._height = height;
        this._blocks = blocks;
    }

    private _width: number;

    get width(): number {
        return this._width;
    }

    private _height: number;

    get height(): number {
        return this._height;
    }

    private _blocks: Array<Coords>;

    get blocks(): Array<Coords> {
        return this._blocks;
    }

    clone(): Field {
        return new Field(this._height, this._width, Util.arrayClone(this._blocks));
    }
}