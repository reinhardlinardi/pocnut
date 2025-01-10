import { Board } from "./board.js";
import { None } from "./marker.js";
import { Size as size } from "./size.js";

export interface Move {
    row: number,
    col: number,
};

export function move(board: Board): Move {
    let arr: Move[] = [];

    for(let row=0; row<size; row++) {
        for(let col=0; col<size; col++) {
            if(board[row][col] === None) arr.push({row: row, col: col});
        }
    }

    return arr[Math.floor(Math.random()*arr.length)];
}
