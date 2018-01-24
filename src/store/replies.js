const state = {
    replyData: [],
};
const getters = {
    replyData: state => state.replyData
};
const mutations = {
    setReplyData (state, payload) {
        state.replyData = payload;
    }
};

const actions = {
    async requestVideoReplies ({ commit }, params) {
        const res = await request.default(`http://baobab.kaiyanapp.com/api/v2/replies/video`, params);
        const { itemList, nextPageUrl } = res;

        commit('setReplyData', itemList);
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}