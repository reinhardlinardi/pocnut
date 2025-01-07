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
        markers: page.markers,
        getMarkerText: page.getMarkerText,

        board: page.board,
        empty: page.empty,

        ended: page.ended,
        draw: page.draw,

        onClickMarker: page.onClickMarker,
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
