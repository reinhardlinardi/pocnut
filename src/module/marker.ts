export type Marker = string;

export const X: Marker = 'X';
export const O: Marker = 'O';


const list: readonly Marker[] = Object.freeze([X, O]);

export function getList(): Marker[] {
    return [...list];
}
