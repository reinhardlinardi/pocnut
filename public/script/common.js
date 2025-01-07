/* DOM */
export function getElement(id) {
    return document.getElementById(id);
}

// Return data from data-* attribute
export function getElementData(id) {
    return getElement(id).dataset;
}


/* Data */
export function getMarker(id) {
    const data = getElementData(id);
    return data.marker;
}

export function getRow(id) {
    const data = getElementData(id);
    return data.row;
}

export function getCol(id) {
    const data = getElementData(id);
    return data.col;
}
