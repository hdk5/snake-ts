import Game from "./Game";
import GamePreset from "./GamePreset";
import ScoreBoardHelper from "./ScoreBoardHelper";

export default class HtmlHelper {
    private _game: Game;
    private _htmlRoot: HTMLElement;
    private _gameInit: HTMLDivElement;
    private _gameProgress: HTMLDivElement;
    private _gameOver: HTMLDivElement;
    private _finalScore: HTMLSpanElement;
    private _leaderBoard: HTMLDivElement;

    constructor(game: Game, htmlRoot: HTMLElement) {
        this._game = game;
        this._htmlRoot = htmlRoot;

        let canvas = document.createElement("canvas");
        this._canvas = canvas;

        let gameProgress: HTMLDivElement = document.createElement("div");
        {
            gameProgress.appendChild(canvas);
            gameProgress.appendChild(document.createElement("br"));

            gameProgress.appendChild(document.createTextNode("Score: "));
            let gameScore = document.createElement("span");
            gameProgress.appendChild(gameScore);

            this._gameScore = gameScore;
        }
        this._gameProgress = gameProgress;

        let gameInit: HTMLDivElement = document.createElement("div");
        {
            gameInit.appendChild(document.createTextNode("Difficulty: "));
            let difficultyInput = document.createElement("input");
            difficultyInput.type = "number";
            difficultyInput.min = "1";
            difficultyInput.max = "60";
            difficultyInput.value = "10";
            gameInit.appendChild(difficultyInput);
            gameInit.appendChild(document.createElement("br"));

            gameInit.appendChild(document.createTextNode("Field: "));
            let fieldSelect = document.createElement("select");

            for (let preset of GamePreset.presets) {
                let fieldOption: HTMLOptionElement;
                fieldOption = document.createElement("option");
                fieldOption.text = preset.name;
                fieldSelect.add(fieldOption);
            }
            gameInit.appendChild(fieldSelect);

            gameInit.appendChild(document.createElement("br"));

            gameInit.appendChild(document.createTextNode("Name: "));
            let nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = "Player";
            gameInit.appendChild(nameInput);
            gameInit.appendChild(document.createElement("br"));

            let gameStart = document.createElement("button");
            gameStart.appendChild(document.createTextNode("Start"));
            gameStart.onclick = () => {
                let difficulty: number = Number(difficultyInput.value);
                let gamePreset = GamePreset.presets[fieldSelect.selectedIndex];
                let name: string = nameInput.value;
                game.initGame(difficulty, gamePreset, name);
            };
            gameInit.appendChild(gameStart);
        }
        this._gameInit = gameInit;

        let gameOver: HTMLDivElement = document.createElement("div");
        {
            gameOver.appendChild(document.createTextNode("You scored "));
            this._finalScore = document.createElement("span");
            gameOver.appendChild(this._finalScore);
            gameOver.appendChild(document.createElement("br"));

            let playAgain: HTMLButtonElement = document.createElement("button");
            {
                playAgain.appendChild(document.createTextNode("Play again"));
                playAgain.onclick = () => this.gameInit();
            }

            gameOver.appendChild(playAgain);

            let leaderBoard: HTMLDivElement = document.createElement("div");
            this._leaderBoard = leaderBoard;
            gameOver.appendChild(leaderBoard);
        }
        this._gameOver = gameOver;
    }

    private _gameScore: HTMLSpanElement;

    set gameScore(value: number) {
        HtmlHelper.clearNode(this._gameScore);
        this._gameScore.appendChild(document.createTextNode(String(value)));
    }

    get root(): HTMLElement {
        return this._htmlRoot;
    }

    private _canvas: HTMLCanvasElement;

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    private static clearNode(node: Node): void {
        while (node.lastChild) {
            node.removeChild(node.lastChild)
        }
    }

    gameInit(): void {
        HtmlHelper.clearNode(this._htmlRoot);
        this._htmlRoot.appendChild(this._gameInit);
    }

    gameProgress(): void {
        HtmlHelper.clearNode(this._htmlRoot);
        this._htmlRoot.appendChild(this._gameProgress)
    }

    gameOver(): void {
        HtmlHelper.clearNode(this._htmlRoot);
        HtmlHelper.clearNode(this._finalScore);
        HtmlHelper.clearNode(this._leaderBoard);

        let topScores: Array<{ score: number, date: Date, name: string }> = ScoreBoardHelper.getTopScores(this._game.presetName);
        let scoresList: HTMLOListElement = document.createElement("ol");
        for (let score of topScores) {
            let scoreListElement: HTMLLIElement = document.createElement("li");
            scoreListElement.appendChild(document.createTextNode(score.name));
            scoreListElement.appendChild(document.createTextNode(" - "));
            scoreListElement.appendChild(document.createTextNode(String(score.score)));
            scoreListElement.appendChild(document.createTextNode(" - "));
            scoreListElement.appendChild(document.createTextNode(score.date.toLocaleString()));
            scoresList.appendChild(scoreListElement);
        }
        this._leaderBoard.appendChild(scoresList);

        this._finalScore.appendChild(document.createTextNode(String(this._game.score)));
        this._htmlRoot.appendChild(this._gameOver)
    }
}