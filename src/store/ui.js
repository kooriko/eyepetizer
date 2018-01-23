const state = {
    categoryIndex: '1',
    scrollTop: 0,
    fromPath: null,
}

const getters = {
    categoryIndex: state => state.categoryIndex,
    scrollTop: state => state.scrollTop,
    fromPath: state => state.fromPath,
}

const mutations = {
    changeCategoryIndex (state, payload) {
        state.categoryIndex = payload;
    },
    changeScrollTop (state, payload) {
        state.scrollTop = payload;
    },
    recordFromPath (state, payload) {
        state.fromPath = payload;
    },
    // recordFromPageScrollY (state, payload) {
    //     state.fromPageScrollY = payload;
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}