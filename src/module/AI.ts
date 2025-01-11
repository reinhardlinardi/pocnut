import { Move } from "./move.js";
import { Game } from "./game.js";
import { Board } from "./board.js";
import { State } from "./state.js";
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

        const c = this.getMoves();
        const idx = Math.floor(Math.random()*c.length);

        this.game.move(c[idx]);
        return c[idx];
        // return minimax(game.clone(), 0, marker);
    }

    private state(): State {
        return this.game.getState();
    }

    // TODO: Make private
    board(): Board {
        return this.state().board;
    }

    private getMoves(): Move[] {
        const board = this.board();
        let m: Move[] = [];
    
        for(let row=0; row<size; row++) {
            for(let col=0; col<size; col++) {
                if(board[row][col] === None) m.push({row: row, col: col});
            }
        }
        return m;
    }

    // private minimax(game: Game, marker: Marker, depth: number): Move {
    //     const state = game.getState();
    //     const result = state.result;
        
    //     if(result.ended) {
    //         // Win as soon as possible, draw or lose as long as possible
    //         const score = result.winner === marker? INF-depth : depth-INF;
    //         return {row: -1, col: -1, score: score};
    //     }
    
    //     const board = state.board;
    //     const c = candidates(board);
    
    //     let move: Move = {row: -1, col: -1, score: 2*-INF};
        
    //     // Player's optimal move = minimize score, AI's optimal move = maximize score
    //     c.forEach((sq) => {
    //         const g = game.clone();
    //         g.move(sq.row, sq.col);
    //     });
    
    //     return move;   
    // }
};


