import { None } from './marker.js';
import { Size as size } from './size.js';

export type Board = string[][];

export function New(): Board {
    let board: Board = [];

    for(let i=0; i<size; i++) {
        let row: string[] = [];

        for(let j=0; j<size; j++) row.push(None);
        board.push(row);
    }

    return board;
}
