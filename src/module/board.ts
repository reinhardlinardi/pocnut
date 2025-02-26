import { None } from './marker.js';
import { Size as size } from './size.js';

export type Board = string[][];

export function New(): Board {
    let board: Board = [];

    for(let row=0; row<size; row++) {
        board.push([]);
        for(let col=0; col<size; col++) board[row].push(None);
    }

    return board;
}

export function copy(board: Board): Board {
    let copy: Board = New();

    for(let row=0; row<size; row++) copy[row] = [...board[row]];
    return copy;
}
