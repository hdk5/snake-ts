class Direction {
    public static Up = new Direction();
    public static Down = new Direction();
    public static Left = new Direction();
    public static Right = new Direction();

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
