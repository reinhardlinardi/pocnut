import * as Common from './common.js';
import { Size as size } from '../module/size.js';
import { X, O, None, opponentOf, getList as getMarkers } from '../module/marker.js';


/* Marker */
const markerText = Object.freeze({
    [X]: 'Move first',
    [O]: 'Bring it on!',
});

export function markers() {
    return getMarkers();
}

export function getMarkerText(marker) {
    return markerText[marker];
}

/* Grid */
export function unmarked(marker) {
    return marker === None;
}

/* Event listener */
export function onClickMarker(ev) {
    const player = Common.getMarker(ev.target.id);
    this.ai = {marker: opponentOf(player), move: player === O};

    this.play = true;
    this.result = {ended: false, draw: false};
    this.grid = [];

    for(let r=0; r<size; r++) {
        let row = [];
        for(let c=0; c<size; c++) row.push(None);        
        this.grid.push(row);
    }
}

export function onClickResign(ev) {
    this.result.ended = true;
}

export function onClickReset(ev) {
    this.play = false;
}
