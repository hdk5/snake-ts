interface ScoreBoard {
    [key: string]: Array<Score>
}

interface Score {
    score: number;
    date: Date;
    name: string;
}

export default class ScoreBoardHelper {

    private static LS_KEY = "score_board";

    static getBoard(): ScoreBoard {
        let sbRaw;
        let sb: ScoreBoard = {};
        try {
            let sbS: string = localStorage.getItem(ScoreBoardHelper.LS_KEY);
            sbRaw = JSON.parse(sbS);
        } catch (ex) {
            sbRaw = {};
        }
        for (let k in sbRaw) {
            if (!sbRaw.hasOwnProperty(k)) continue;
            if (!Array.isArray(sbRaw[k])) continue;
            sb[k] = (sbRaw[k] as Array<any>)
                .filter(value =>
                    value != null
                    && value.hasOwnProperty("name")
                    && value.hasOwnProperty("date")
                    && value.hasOwnProperty("score")
                    && typeof value.name === "string"
                    && !isNaN(Date.parse(value.date))
                    && typeof value.score === "number"
                    && value.score >= 0)
                .map(value =>
                    ({
                        score: value.score,
                        date: new Date(value.date),
                        name: value.name
                    })
                );

        }
        return sb;
    }

    static saveBoard(board: ScoreBoard) {
        let sbs: string = JSON.stringify(board);
        localStorage.setItem(ScoreBoardHelper.LS_KEY, sbs);
    }

    static getTopScores(map: string): Array<Score> {
        let sb: ScoreBoard = ScoreBoardHelper.getBoard();
        let fb: Array<Score> = sb.hasOwnProperty(map) ? sb[map] : [];
        return fb
            .filter(value => value.score > 0)
            .sort((a: any, b: any) => b.score - a.score || a.date - b.date)
            .slice(0, 10);
    }

    static addScore(map: string, score: Score) {
        let sb: ScoreBoard = ScoreBoardHelper.getBoard();
        let fb: Array<Score> = sb.hasOwnProperty(map) ? sb[map] : [];
        fb.push(score);
        sb[map] = fb;
        ScoreBoardHelper.saveBoard(sb);
    }
}