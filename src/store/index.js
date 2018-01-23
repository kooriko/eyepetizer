import Vue from 'vue';
import Vuex from 'vuex';

import ui from './ui';
import videos from './videos';
import categories from './categories';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
        videos,
        categories,
    }
});