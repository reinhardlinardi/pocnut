import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import * as page from './index.js';

// Root component
const component = {
    data() {
        return {
            play: false,
            ended: false,
            ai: {
                move: false,
                marker: '',
            },
            grid: [],
        }
    },
    methods: {
        markers: page.markers,
        getMarkerText: page.getMarkerText,

        onClickMarker: page.onClickMarker,
    },
};

// Setup vue
const app = createApp(component);
app.config.errorHandler = (err) => {
    console.log(err);
};
app.mount('#app');
