import Vue from 'vue';
import url from 'url';
import { mapGetters } from 'vuex';

import { queryToObject } from '../assets/util';

import Menu from './Menu';
import MenuItem from './MenuItem';
import FollowCard from './Cards/FollowCard';
import BriefCard from './Cards/BriefCard';
import TextCard from './Cards/TextCard';
import VideoList from './VideoList';
import Duration from './package/duration';
import VideoSmallCard from './Cards/VideoSmallCard';
import DynamicInfoCard from './Cards/DynamicInfoCard';
import HorizontalScrollCard from './Cards/HorizontalScrollCard';

import SquareCardCollection from './Collections/SquareCardCollection';
import VideoCollectionWithBrief from './Collections/VideoCollectionWithBrief';
import Video from './package/video';
import Banner from './package/banner';
import Reply from './package/reply';

const plugin = {};

plugin.install = () => {
    Vue.prototype.$bus = new Vue();

    Vue.filter('$_secondToMin', val => {
        const arr = [ (val / 60) | 0, val % 60 ];
        return arr.map(item => String(item).padStart(2, '0')).join(':');
    });
    Vue.mixin({
        methods: {
            $_toVideoPage (vid) {
                this.$router.push({ name: 'video', query: { id: vid } });
            },
            $_toAuthorPage (aid) {

            },
            $_toVideoReplyPage (actionUrl) {
                const query = url.parse(actionUrl).query;
                this.$router.push({ name: 'reply', query: queryToObject(query) });
            },
            $_toCategoryPage (actionUrl) {
                const urlObj = url.parse(actionUrl);
                const { host, path } = urlObj;
                this.$router.push({ path: `category${path}` });
            },
            $_backTo () {
                this.$router.push({ path: this.fromPath });
            },
        },
        computed: {
            ...mapGetters('ui', [ 'fromPath' ])
        }
    })
    const components = [ 
        Menu,
        MenuItem, 
        FollowCard, 
        VideoList, 
        BriefCard, 
        TextCard, 
        DynamicInfoCard, 
        VideoSmallCard, 
        Duration,
        Banner,
        HorizontalScrollCard,
        VideoCollectionWithBrief,
        Video,
        Reply,
        SquareCardCollection
    ];
    components.forEach(item => {
        Vue.component(item.name, item);
    });
}

export default plugin;