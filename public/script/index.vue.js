import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import * as page from './index.js';

// Root component
const component = {
    data() {
        return {
            play: false,
            state: {},
        }
    },
    computed: {
        wait: page.wait,
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

        move: page.move,

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
