class Direction {
    public static Up = new Direction("Up");
    public static Down = new Direction("Down");
    public static Left = new Direction("Left");
    public static Right = new Direction("Right");

    constructor(private id: string) {
    }

    reverse(): Direction {
        switch (this) {
            case Direction.Left:
                return Direction.Right;
            case Direction.Right:
                return Direction.Left;
            case Direction.Up:
                return Direction.Down;
            case Direction.Down:
                return Direction.Up;
        }
        return null;
    }
}

export default Direction;
