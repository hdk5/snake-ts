import Direction from "./Direction";
import Coords from "./Coords";
import Util from "./Util";

export default class {
    static decide(origin: Coords, destination: Coords, obstacles: Array<Coords>, height: number, width: number): Direction {
        let hashCoords: (p: Coords) => number = (p) => {
            return (p.row * width + p.column);
        };

        let unhashCoords: (p: number) => Coords = (p) => {
            let r = (p / width | 0);
            let c = p % width;
            return new Coords(r, c);
        };

        let getHeuristic: (p1: Coords, p2: Coords) => number = (p1, p2) => {
            let r = Math.min(
                Math.abs(p1.row - p2.row),
                // Infinity
                height - Math.abs(p1.row - p2.row)
                // Math.min(p1.row, p2.row) + height - Math.max(p1.row, p2.row)
            );
            let c = Math.min(
                Math.abs(p1.column - p2.column),
                // Infinity
                width - Math.abs(p1.column - p2.column)
                // Math.min(p1.column, p2.column) + width - Math.max(p1.column, p2.column)
            );
            return r + c;
            // return 0;
        };

        let getNeighbours: (p: Coords) => Array<number> = (p) => {
            let u = p.clone();
            u.row = Util.mod(u.row - 1, height);
            let d = p.clone();
            d.row = Util.mod(d.row + 1, height);
            let l = p.clone();
            l.column = Util.mod(l.column - 1, width);
            let r = p.clone();
            r.column = Util.mod(r.column + 1, width);

            let n = [u, d, l, r];

            return n
                .map(value => hashCoords(value))
                .filter(value => !obstaclesH.includes(value));
        };

        let reconstructPath: (currentH: number) => Array<number> = (currentH: number) => {
            let path: Array<number> = [];
            path.push(destinationH);
            while (cameFrom.has(currentH)) {
                currentH = cameFrom.get(currentH);
                path.push(currentH);
            }
            return path;
        };

        let originH = hashCoords(origin);
        let destinationH = hashCoords(destination);
        let obstaclesH: Array<number> = obstacles
            .map(value => hashCoords(value))
            .filter(value => value != originH && value != destinationH);

        let closed: Set<number> = new Set<number>();
        let open: Set<number> = new Set<number>();
        open.add(originH);

        let cameFrom: Map<number, number> = new Map<number, number>();

        let gScore: Map<number, number> = new Map<number, number>();
        gScore.set(originH, 0);

        let fScore: Map<number, number> = new Map<number, number>();
        fScore.set(originH, getHeuristic(origin, destination));

        while (open.size > 0) {
            let currentH: number;
            {
                let minF = Infinity;

                for (let o of open) {
                    let f = fScore.get(o);
                    if (f == undefined) {
                        f = Infinity;
                    }
                    if (f <= minF) {
                        currentH = o;
                        minF = f;
                    }
                }
            }

            if (currentH == destinationH) {
                let path: Array<number> = reconstructPath(currentH);

                let from: Coords = unhashCoords(path.pop());
                let to: Coords = unhashCoords(path.pop());

                if (from.row == to.row) {
                    if (Util.mod(from.column + 1, width) == to.column) {
                        return Direction.Right;
                    } else if (Util.mod(from.column - 1, width) == to.column) {
                        return Direction.Left;
                    }
                } else if (from.column == to.column) {
                    if (Util.mod(from.row + 1, height) == to.row) {
                        return Direction.Down;
                    } else if (Util.mod(from.row - 1, height) == to.row) {
                        return Direction.Up;
                    }
                }

                return null;
            }

            open.delete(currentH);
            closed.add(currentH);

            let neighboursH: Array<number> = getNeighbours(unhashCoords(currentH));
            for (let neighbourH of neighboursH) {
                if (closed.has(neighbourH)) {
                    continue;
                }

                open.add(neighbourH);

                let currentG = gScore.has(currentH) ? gScore.get(currentH) : Infinity;
                let neighbourG = gScore.has(neighbourH) ? gScore.get(neighbourH) : Infinity;

                let tgScore = currentG + 1;
                if (tgScore >= neighbourG) {
                    continue;
                }

                cameFrom.set(neighbourH, currentH);
                gScore.set(neighbourH, tgScore);
                fScore.set(neighbourH, tgScore + getHeuristic(unhashCoords(neighbourH), destination));
            }
        }

        return null;

    }
}