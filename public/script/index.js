import * as Common from './common.js';
import { Game } from '../module/game.js';
import { X, O, None, getList as getMarkers } from '../module/marker.js';


const game = new Game();
var selected;


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
export function wait() {
    return this.state.move === selected;
}

export function ended() {
    return this.state.result.ended;
}

export function draw() {
    return this.state.result.winner === None;
}


/* Event listener */
export function onClickMarker(ev) {
    selected = Common.getMarker(ev.target.id);
    this.play = true;
    
    this.state = game.getState();
    console.log((this.wait? "Player":"AI") + "'s turn");
}

export function onClickResign(ev) {
    game.reset();
}

export function onClickReset(ev) {
    this.play = false;
}
