import { Move } from './move.js';
import { copy } from './board.js';
import * as Result from './result.js';
import { Size as size } from './size.js';
import { None, opponentOf } from "./marker.js";
import { State, New as newState } from "./state.js";


export class Game {
    private state: State;

    constructor() {
        this.state = newState();
    }

    getState(): State {
        const s = this.state;
        return {board: copy(s.board), move: s.move, result: {...s.result}};
    }

    clone(): Game {
        const copy = new Game();
        copy.state = this.getState();

        return copy;
    }

    reset() {
        this.state = newState();
    }

    resign() {
        const state = this.state;
        const winner = opponentOf(state.move);
        state.result = Result.end(winner);
    }

    move(move: Move) {
        const state = this.state;
        const board = state.board;

        const row = move.row;
        const col = move.col;

        if(board[row][col] !== None) return;

        board[row][col] = state.move;

        if(this.lastMoveWins()) state.result = Result.end(state.move);
        else if(this.noEmptySquare()) state.result = Result.end(None);

        state.move = opponentOf(state.move);
    }

    private lastMoveWins(): boolean {
        return this.markedRow() || this.markedColumn() || this.markedDownDiagonal() || this.markedUpDiagonal();
    }

    private markedRow(): boolean {
        const board = this.state.board;

        for(let row=0; row<size; row++) {
            const marker = board[row][0];
            if(marker === None) continue;

            for(let col=1; col<size; col++) {
                if(board[row][col] !== marker) break;
                if(col === size-1) return true;
            }
        }
        return false;
    }

    private markedColumn(): boolean {
        const board = this.state.board;

        for(let col=0; col<size; col++) {
            const marker = board[0][col];
            if(marker === None) continue;

            for(let row=1; row<size; row++) {
                if(board[row][col] !== marker) break;
                if(row === size-1) return true;
            }
        }
        return false;
    }

    private markedDownDiagonal(): boolean {
        const board = this.state.board;
        const marker = board[0][0];
        
        if(marker === None) return false;

        for(let row=1; row<size; row++) {
            if(board[row][row] !== marker) return false;
        }
        return true;
    }

    private markedUpDiagonal(): boolean {
        const board = this.state.board;
        const marker = board[0][size-1];

        if(marker === None) return false;
        
        for(let row=1; row<size; row++) {
            if(board[row][size-1-row] !== marker) return false;
        }
        return true;
    }

    private noEmptySquare(): boolean {
        const board = this.state.board;

        for(let row=0; row<size; row++) {
            for(let col=0; col<size; col++) {
                if(board[row][col] === None) return false;
            }
        }
        return true;
    }
};
