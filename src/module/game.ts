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
};
