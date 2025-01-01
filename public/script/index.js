import * as Common from './common.js';
import { X, O, opponentOf, getList as getMarkers } from '../module/marker.js';


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
    const marker = Common.getMarker(ev.target.id);
    this.ai = opponentOf(marker);
    console.log(this.ai);
    
    //this.play = true;
}
