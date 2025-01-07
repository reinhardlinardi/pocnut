import { Marker, X } from './marker.js';
import { Board, New as newBoard } from './board.js';
import { Result, New as newResult } from './result.js';

export interface State {
    board: Board,
    move: Marker,
    result: Result,
};

export function New(): State {
    return {board: newBoard(), move: X, result: newResult()};
}
