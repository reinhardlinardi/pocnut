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

export function isTop(r) {
    return r === 0;
}

export function isBottom(r) {
    return r === size-1;
}

export function isLeft(c) {
    return c === 0;
}

export function isRight(c) {
    return c === size-1;
}

export function isEmpty(r, c) {
    return this.state.board[r][c] === None;
}


/* Event listener */
export function onClickSelect(ev) {
    selected = Common.getMarker(ev.target.id);
    this.play = true;
    
    game.reset();
    this.state = game.getState();
}

export function onClickMark(ev) {
    const r = Common.getRow(ev.target.id);
    const c = Common.getCol(ev.target.id);

    console.log(r, c);
}

export function onClickResign(ev) {
    game.resign();
    this.state = game.getState();
}

export function onClickReset(ev) {
    this.play = false;
}
