import Vue from 'vue';
import Vuex from 'vuex';

import ui from './ui';
import replies from './replies';
import videos from './videos';
import categories from './categories';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
        replies,
        videos,
        categories,
    }
});