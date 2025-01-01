import { X, O, getList as getMarkers } from '../module/marker.js';

/* Marker */
const markerText = Object.freeze({
    X: 'Move first',
    O: 'Bring it on!',
});

export function markers() {
    return getMarkers();
}

export function getMarkerText(marker) {
    return markerText[marker];
}
