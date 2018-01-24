const state = {
    categoryData: [],
    categoryViewBatch: {
        categoryInfo: {},
        tabInfo: {}
    }
};

const getters = {
    categoryData: state => state.categoryData,
    categoryViewBatch: state => state.categoryViewBatch
};

const mutations = {
    setCategoryData (state, payload) {
        state.categoryData = payload;
    },
    setCategoryViewBatch (state, payload) {
        state.categoryViewBatch = payload;
        console.log(payload);
    }
};

const actions = {
    async getTagData ({ commit }, params = {}) {

    },
    async getTagViewBatch ({ commit }, params = {}) {

    },
    async getCategoryData ({ commit }, params = {}) {
        const res = await request.default(`/api/v4/categories/detail/index/`, params);
        const { itemList } = res;
        commit('setCategoryData', itemList);
    },
    async getCategoryViewBatch ({ commit }, params = {}) {
        const res = await request.default(`/api/v4/categories/detail/tab/`, params);
        console.log(res);
        commit('setCategoryViewBatch', res);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}