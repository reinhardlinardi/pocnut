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
