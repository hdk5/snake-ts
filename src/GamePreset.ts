import Snake from "./Snake";
import Field from "./Field";
import Coords from "./Coords";
import Direction from "./Direction";

export default class GamePreset {

    static presets: Array<GamePreset> = [];

    constructor(name: string, snakes: Array<Snake>, field: Field) {
        this._name = name;
        this._snakes = snakes;
        this._field = field;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    private _snakes: Array<Snake>;

    get snakes(): Array<Snake> {
        return this._snakes;
    }

    private _field: Field;

    get field(): Field {
        return this._field;
    }

}

{
    let height = 24;
    let width = 30;
    let field = new Field(height, width, []);
    let player = new Snake(height, width, [new Coords(0, 2), new Coords(0, 1), new Coords(0, 0)], Direction.Right);
    let enemyBL = new Snake(height, width, [new Coords(height - 3, 0), new Coords(height - 2, 0), new Coords(height - 1, 0)], Direction.Up);
    let enemyTR = new Snake(height, width, [new Coords(2, width - 1), new Coords(1, width - 1), new Coords(0, width - 1)], Direction.Down);
    let enemyBR = new Snake(height, width, [new Coords(height - 1, width - 3), new Coords(height - 1, width - 2), new Coords(height - 1, width - 1)], Direction.Left);
    let snakes = [player, enemyBL, enemyTR, enemyBR];
    GamePreset.presets.push(new GamePreset("Infinite Field", snakes, field));
}

{
    let height = 24;
    let width = 30;
    let fieldBlocks = [];
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            if (i == 0 || j == 0 || i == height - 1 || j == width - 1) {
                fieldBlocks.push(new Coords(i, j));
            }
        }
    }
    let field = new Field(height, width, fieldBlocks);
    let player = new Snake(height, width, [new Coords(2, 4), new Coords(2, 3), new Coords(2, 2)], Direction.Right);
    let enemyBL = new Snake(height, width, [new Coords(height - 5, 2), new Coords(height - 4, 2), new Coords(height - 3, 2)], Direction.Up);
    let enemyTR = new Snake(height, width, [new Coords(4, width - 3), new Coords(3, width - 3), new Coords(2, width - 3)], Direction.Down);
    let enemyBR = new Snake(height, width, [new Coords(height - 3, width - 5), new Coords(height - 3, width - 4), new Coords(height - 3, width - 3)], Direction.Left);
    let snakes = [player, enemyBL, enemyTR, enemyBR];
    GamePreset.presets.push(new GamePreset("Box", snakes, field))
}

{
    let height = 24;
    let width = 30;
    let fieldBlocks = [];
    for (let i = 0; i < height; i += 2) {
        for (let j = 0; j < width; j += 2) {
            fieldBlocks.push(new Coords(i, j));
        }
    }

    let field = new Field(height, width, fieldBlocks);
    let player = new Snake(height, width, [new Coords(1, 3), new Coords(1, 2), new Coords(1, 1)], Direction.Right);
    let enemyBL = new Snake(height, width, [new Coords(height - 3, 1), new Coords(height - 2, 1), new Coords(height - 1, 1)], Direction.Up);
    let enemyTR = new Snake(height, width, [new Coords(3, width - 1), new Coords(2, width - 1), new Coords(1, width - 1)], Direction.Down);
    let enemyBR = new Snake(height, width, [new Coords(height - 1, width - 3), new Coords(height - 1, width - 2), new Coords(height - 1, width - 1)], Direction.Left);
    let snakes = [player, enemyBL, enemyTR, enemyBR];
    GamePreset.presets.push(new GamePreset("Grid", snakes, field))
}
