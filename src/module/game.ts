import * as Result from './result.js';
import { opponentOf } from "./marker.js";
import { State, New as newState } from "./state.js";


export class Game {
    private state: State;

    constructor() {
        this.state = newState();
    }

    getState(): State {
        return {...this.state};
    }

    reset() {
        this.state = newState();
    }

    resign() {
        const winner = opponentOf(this.state.move);
        this.state.result = Result.end(winner);
    }
};
