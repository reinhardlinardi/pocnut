import * as Result from './result.js';
import { Size as size } from './size.js';
import { State, New as newState } from "./state.js";
import { Marker, None, opponentOf } from "./marker.js";


export class Game {
    private state: State;

    constructor() {
        this.state = newState();
    }

    getState(): State {
        return {...this.state};
    }

    reset() {
        this.state = newState();
    }

    resign() {
        const state = this.state;
        const winner = opponentOf(state.move);
        state.result = Result.end(winner);
    }

    move(row: number, col: number) {
        const state = this.state;
        if(state.board[row][col] !== None) return;

        state.board[row][col] = state.move;
        if(this.isOver()) state.result = Result.end(state.move);

        state.move = opponentOf(state.move);
    }

    private isOver(): boolean {
        const board = this.state.board;
        let marker: Marker;

        for(let row=0; row<size; row++) {
            marker = board[row][0];
            if(marker === None) continue;

            for(let col=1; col<size; col++) {
                if(board[row][col] !== marker) break;
                if(col === size-1) return true;
            }
        }
        for(let col=0; col<size; col++) {
            marker = board[0][col];
            if(marker === None) continue;

            for(let row=1; row<size; row++) {
                if(board[row][col] !== marker) break;
                if(row === size-1) return true;
            }
        }

        marker = board[0][0];
        if(marker !== None) {
            for(let row=1; row<size; row++) {
                if(board[row][row] !== marker) break;
                if(row == size-1) return true;
            }
        }

        marker = board[0][size-1];
        if(marker !== None) {
            for(let row=1; row<size; row++) {
                if(board[row][size-1-row] !== marker) break;
                if(row === size-1) return true;
            }
        }

        return false;
    }
};
