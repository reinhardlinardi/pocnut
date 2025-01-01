import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import * as page from './index.js';

// Root component
const component = {
    data() {
        return {
            play: false,
            grid: [],
            result: {
                ended: false,
                draw: false,
            },
            ai: {
                move: false,
                marker: '',
            },
        }
    },
    methods: {
        markers: page.markers,
        getMarkerText: page.getMarkerText,

        unmarked: page.unmarked,

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
