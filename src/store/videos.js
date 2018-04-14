const camelCaseToKababCase = str => {
    str = str.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (str[0] === '-') str = str.slice(1);
    return str;
}
const getVideos = originList => {
    const videoList = [];
    const getVideoListRecursively = object => {
        if (object.type === 'video') {
            object.type = 'm-video';
            videoList.push(object.data);
            return ;
        } else if (object.data && object.data.playUrl) {
            videoList.push(object.data);
            return ;
        }
        Object.values(object).forEach(value => {
            if (typeof value === 'object' && value) {
                getVideoListRecursively(value);
            }
        });
    }
    originList.forEach(item => {
        getVideoListRecursively(item);
    });

    return videoList;
}

const state = {
    pickedVideos: [],
    discoveryData: [],
    videoData: [],
    relatedVideos: [],
    recommendData: [],
    dailyData: [],
    categoryData: {},

};

const getters = {
    pickedVideos: state => state.pickedVideos,
    getVideoById: state => id => state.videoData.find(item => item.id === +id),
    relatedVideos: state => state.relatedVideos,
    discoveryData: state => state.discoveryData,
    recommendData:  state => state.recommendData,
    dailyData: state => state.dailyData,
    originCategoryData: state => state.categoryData,
};

const mutations = {
    setPickedVideos (state, payload) {
        state.pickedVideos = payload;
    },
    setDiscoveryData (state, payload) {
        state.discoveryData = payload;
    },
    setVideoData (state, payload) {
        const { videoData } = state;
        if (payload instanceof Array) {
            payload.forEach(willBePushItem => {
                if (videoData.find(videoItem => videoItem.id === willBePushItem.id)) {
                    return ;
                } else {
                    videoData.push(willBePushItem);
                }
            });
        } else {
            videoData.push(payload);
        }
        state.videoData = videoData;
    },
    setRelatedVideos (state, payload) {
        state.relatedVideos = payload;
    },
    setRecommendData (state, payload) {
        state.recommendData = payload;
    },
    setDailyData (state, payload) {
        state.dailyData = payload;
    },
    setCategoryData (state, payload) {
        const { category, list } = payload;
        state.categoryData[category] = list;
    }
};

const actions = {
    async requestCategoryData ({ commit }, originParams = {}) {
        const { category, ...params } = originParams;
        const res = await request(`http://baobab.kaiyanapp.com/api/v5/index/tab/category/${category}?`, params);
        const { itemList } = res;
        const videoList = getVideos(itemList);
        commit('setVideoData', videoList);
        commit('setCategoryData', {
            category,
            list: itemList
        });
    },
    async requestDailyData ({ commit }, params = {}) {
        const res = await request('http://baobab.kaiyanapp.com/api/v5/index/tab/feed', params);
        const { itemList } = res;
        const videoList = getVideos(itemList);

        commit('setVideoData', videoList);
        commit('setDailyData', itemList);
    },
    async requestDiscoveryData ({ commit }, params = {}) {
        const res = await request(`http://baobab.kaiyanapp.com/api/v5/index/tab/discovery`, params);
        const { itemList } = res;
        const videoList = getVideos(itemList);

        commit('setVideoData', videoList);
        commit('setDiscoveryData', itemList);
    },
    async requestRelatedVideos ({ commit }, params = {}) {
        const res = await request(`http://baobab.kaiyanapp.com/api/v4/video/related`, params);
        const { itemList } = res;
        const videoList = getVideos(itemList);
        commit('setVideoData', videoList);
        commit('setRelatedVideos', itemList);
    },
    async requestRecommendData ({ commit }, params = {}) {
        const res = await request(`http://baobab.kaiyanapp.com/api/v5/index/tab/allRec`, params);

        const { itemList, nextPageUrl } = res;
        const videoList = getVideos(itemList);
        commit('setVideoData', videoList);
        commit('setRecommendData', itemList);
    },
    async queryVideo ({ state, getters, commit }, params) {
        const { id } = params;
        const video = getters.getVideoById(id);
        if (video) return true;

        const resVideo = await request(`http://baobab.kaiyanapp.com/api/v2/video/${id}`, params);
        commit('setVideoData', resVideo);
        return true;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
