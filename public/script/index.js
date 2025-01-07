import * as Common from './common.js';
import { Game } from '../module/game.js';
import { X, O, None, getList as getMarkers } from '../module/marker.js';

const game = new Game();

/* Marker */
const markerText = Object.freeze({[X]: 'Move first', [O]: 'Bring it on!'});

export function markers() {
    return getMarkers();
}

export function getMarkerText(marker) {
    return markerText[marker];
}


/* Board */
export function board() {
    return game.getState().board;
}

export function empty(marker) {
    return marker === None;
}


/* Game */
export function ended() {
    const result = this.state.result;
    console.log(result.ended);
    return result.ended;
}

export function draw() {
    const result = this.state.result;
    return result.winner === None;
}


/* Event listener */
export function onClickMarker(ev) {
    const move = this.state.move;
    const player = Common.getMarker(ev.target.id);

    this.wait = move === player;
    this.play = true;

    // if wait false, AI's move

    this.state = game.getState();
    console.log(this.state);
}

export function onClickResign(ev) {
    game.reset();
}

export function onClickReset(ev) {
    this.play = false;
}
