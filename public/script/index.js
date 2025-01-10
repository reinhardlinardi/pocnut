import * as Common from './common.js';
import { Game } from '../module/game.js';
import { X, O, None } from '../module/marker.js';
import { Size as size } from '../module/size.js';


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
    return this.state.board[row][col] === None;
}


/* Move */
export function move(row, col) {
    if(!this.wait) return;

    game.move(row, col);
    this.state = game.getState();

    console.log(this.state);
}


/* Event listener */
export function onClickSelect(ev) {
    selected = Common.getMarker(ev.target.id);
    this.play = true;
    
    game.reset();
    this.state = game.getState();
}

export function onClickMark(ev) {
    const row = Common.getRow(ev.target.id);
    const col = Common.getCol(ev.target.id);
    this.move(row, col);
}

export function onClickResign(ev) {
    game.resign();
    this.state = game.getState();
}

export function onClickReset(ev) {
    this.play = false;
}
