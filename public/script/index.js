import { Game } from '../module/game.js';
import { Engine } from '../module/AI.js';
import { Size as size } from '../module/size.js';
import { X, O, None, opponentOf } from '../module/marker.js';
import { getMarker, getRow, getCol } from './common.js';


const game = new Game();

var engine;
var selected, cnt;


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
    if(this.isOver() || !this.play) return false;

    const board = this.state.board;
    return board[row][col] === None;
}


/* Move */
export async function playerMove(move) {
    if(this.isOver()) return;
    if(!this.play) return;

    this.play = false;

    game.move(move);
    this.state = game.getState();
    cnt--;

    if(!this.isOver()) await this.engineMove(move);
}

export async function engineMove(prev) {
    if(cnt > 1) await sleep(400);
    const move = engine.move(prev);

    game.move(move);
    this.state = game.getState();
    cnt--;

    this.play = true;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/* Event listener */
export async function onClickSelect(ev) {
    selected = getMarker(ev.target.id);
    engine = new Engine(opponentOf(selected));
    
    game.reset();
    this.state = game.getState();

    this.menu = false;
    this.play = selected === this.state.move;

    cnt = size*size;
    if(!this.play) await this.engineMove(null);
}

export async function onClickMark(ev) {
    const row = getRow(ev.target.id);
    const col = getCol(ev.target.id);

    const move = {row: row, col: col};
    await this.playerMove(move);
}

export function onClickResign(ev) {
    game.resign();
    this.state = game.getState();
}

export function onClickReset(ev) {
    this.menu = true;
}
