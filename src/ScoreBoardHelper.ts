import Util from "./Util";

export default class ScoreBoardHelper {
    private static LS_KEY = "score_board";

    static getBoard() {
        let sbRaw;
        let sb = {};
        try {
            let sbs: string = localStorage.getItem(ScoreBoardHelper.LS_KEY);
            sbRaw = JSON.parse(sbs);
            if (!Util.isPlainObject(sbRaw)) {
                sbRaw = {};
            }
        } catch (ex) {
            sbRaw = {};
        }
        for (let k in sbRaw) {
            if (!sbRaw.hasOwnProperty(k)) continue;
            if (!Array.isArray(sbRaw[k])) continue;
            (sb as any)[k] = (sbRaw[k] as Array<any>)
                .filter(value =>
                    typeof value.name === "string"
                    && !isNaN(Date.parse(value.date))
                    && typeof value.score === "number"
                    && value.score >= 0 && value.score < Infinity)
                .map(value => {
                        return {
                            score: value.score,
                            date: new Date(Date.parse(value.date)),
                            name: value.name
                        }
                    }
                );

        }
        return sb;
    }

    static saveBoard(board: Object) {
        let sbs: string = JSON.stringify(board);
        localStorage.setItem(ScoreBoardHelper.LS_KEY, sbs);
    }

    static getTopScores(map: string): Array<{ score: number, date: Date, name: string }> {
        let sb = ScoreBoardHelper.getBoard();
        let fb: Array<{ score: number, date: Date, name: string }> = sb.hasOwnProperty(map) ? (sb as any)[map] : [];
        return fb
            .filter(value => value.score > 0)
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 10);
    }

    static addScore(map: string, score: { score: number, date: Date, name: string }) {
        let sb = ScoreBoardHelper.getBoard();
        let fb = sb.hasOwnProperty(map) ? (sb as any)[map] : [];
        (fb as Array<any>).push(score);
        (sb as any)[map] = fb;
        ScoreBoardHelper.saveBoard(sb);
    }
}