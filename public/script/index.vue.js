import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import * as page from './index.js';

// Root component
const component = {
    data() {
        return {
            menu: true,
            play: true,
            state: {},
        }
    },
    methods: {
        x: page.x,
        o: page.o,

        isOver: page.isOver,
        isDraw: page.isDraw,
        
        board: page.board,
        isTop: page.isTop,
        isBottom: page.isBottom,
        isLeft: page.isLeft,
        isRight: page.isRight,
        isEmpty: page.isEmpty,

        playerMove: page.playerMove,
        engineMove: page.engineMove,

        onClickSelect: page.onClickSelect,
        onClickMark: page.onClickMark,
        onClickResign: page.onClickResign,
        onClickReset: page.onClickReset,
    },
};

// Setup vue
const app = createApp(component);
app.config.errorHandler = (err) => {
    console.log(err);
};
app.mount('#app');
