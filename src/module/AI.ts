import { Move } from "./move.js";
import { Game } from "./game.js";
import { Marker, None } from "./marker.js";
import { Size as size } from "./size.js";


const INF = 3*size*size;


export interface Eval {
    move: Move,
    score: number,
};


export class Engine {
    private marker: Marker;
    private game: Game;

    constructor(marker: Marker) {
        this.marker = marker;
        this.game = new Game();
    }

    move(prev: null | Move): Move {
        if(prev !== null) this.game.move(prev);

        const move = this.minimax(this.game.clone(), 0).move;
        this.game.move(move);

        return move;
    }

    private minimax(game: Game, depth: number): Eval {
        const state = game.getState();
        const board = state.board;
        const result = state.result;
        
        // Win as soon as possible, draw or lose as long as possible
        if(result.ended) {
            const score = result.winner === this.marker? INF-depth : depth-INF;
            return {move: {row: -1, col: -1}, score: score};
        }

        let moves: Move[] = []; 

        for(let row=0; row<size; row++) {
            for(let col=0; col<size; col++) {
                if(board[row][col] === None) moves.push({row: row, col: col});
            }
        }

        let selected = -1;
        let optimal = INF+1;

        const opp = state.move !== this.marker;
        if(!opp) optimal *= -1;

        // Player's optimal move = minimize score, AI's optimal move = maximize score
        moves.forEach((move, idx) => {
            const g = game.clone();
            g.move(move);

            const ev = this.minimax(g, depth+1);
            
            if(!opp && ev.score > optimal || opp && ev.score < optimal) {
                selected = idx;
                optimal = ev.score;
            }
        });

        return {move: moves[selected], score: optimal};
    }
};
