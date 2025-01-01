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

/* Selection */
export function onClickMarker(ev) {
    const player = Common.getMarker(ev.target.id);
    this.ai.marker = opponentOf(player);
    this.ai.move = player === X? false : true;

    this.play = true;
    this.ended = false;
    this.grid = [];

    for(let r=0; r<size; r++) {
        let row = [];
        for(let c=0; c<size; c++) row.push(None);
        
        this.grid.push(row);
    }
    console.log(this.ai);
    console.log(this.grid);
}
