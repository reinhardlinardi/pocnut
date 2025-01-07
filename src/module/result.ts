import { Marker, None } from "./marker.js";

export interface Result {
    ended: boolean,
    winner: Marker,
};

export function New(): Result {
    return {ended: false, winner: None};
}

export function end(winner: Marker): Result {
    return {ended: true, winner: winner};
}
