import * as AI from '../module/ai.js';
import { Game } from '../module/game.js';
import { X, O, None } from '../module/marker.js';
import { Size as size } from '../module/size.js';
import { getMarker, getRow, getCol } from './common.js';


const game = new Game();
var selected;


/* Marker */
export function x() {
    return X;
}

export function o() {
    return O;
}


/* Game */
export function wait() {
    return this.state.move === selected;
}

export function isOver() {
    return this.state.result.ended;
}

export function isDraw() {
    return this.state.result.winner === None;
}


/* Board */
export function board() {
    return this.state.board;
}

export function isTop(row) {
    return row === 0;
}

export function isBottom(row) {
    return row === size-1;
}

export function isLeft(col) {
    return col === 0;
}

export function isRight(col) {
    return col === size-1;
}

export function isEmpty(row, col) {
    if(this.isOver()) return false;
    return this.state.board[row][col] === None;
}


/* Move */
export async function playerMove(row, col) {
    if(this.isOver()) return;
    if(!this.wait) return;

    game.move(row, col);
    this.state = game.getState();

    if(!this.isOver()) await this.AIMove();
}

export async function AIMove() {
    await sleep(400);

    const move = AI.minimax(game, true);
    game.move(move.row, move.col);
    this.state = game.getState();
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/* Event listener */
export function onClickSelect(ev) {
    selected = getMarker(ev.target.id);
    this.play = true;
    
    game.reset();
    this.state = game.getState();

    if(!this.wait) this.AIMove();
}

export function onClickMark(ev) {
    const row = getRow(ev.target.id);
    const col = getCol(ev.target.id);
    this.playerMove(row, col);
}

export function onClickResign(ev) {
    game.resign();
    this.state = game.getState();
}

export function onClickReset(ev) {
    this.play = false;
}
