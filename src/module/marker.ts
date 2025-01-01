export type Marker = string;

export const None: Marker = 'N';
export const X: Marker = 'X';
export const O: Marker = 'O';

export function opponentOf(marker: Marker): Marker {
    return marker === X? O : X;
}


const list: readonly Marker[] = Object.freeze([X, O]);

export function getList(): Marker[] {
    return [...list];
}
