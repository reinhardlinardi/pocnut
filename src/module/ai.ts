import { Board } from "./board.js";
import { None } from "./marker.js";
import { Game } from "./game.js";
import { Size as size } from "./size.js";


interface Square {
    row: number,
    col: number,
};

export interface Move extends Square {
    score: number,
};


export function minimax(game: Game, turn: boolean): Move {
    const state = game.getState();
    const c = candidates(state.board);

    const idx = Math.floor(Math.random()*c.length);
    return {...c[idx], score: 0};
}

function candidates(board: Board): Square[] {
    let c: Square[] = [];

    for(let row=0; row<size; row++) {
        for(let col=0; col<size; col++) {
            if(board[row][col] === None) c.push({row: row, col: col});
        }
    }

    return c;
}
