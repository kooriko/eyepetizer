<template lang="pug">
    section.reply-container
        div.top
            h3.title {{ decodeURIComponent($route.query.videoTitle) }}
            div.btns
                button.eyepetizer-btn(@click="$_toVideoPage($route.query.videoId)") 进入视频详情页
                //- button.eyepetizer-btn 发表新评论
            div.eyepetizer-btn.return-btn(@click="$_backTo") 返回
        div.body
            component(v-for="(item, index) in replyData" :key="index" :data="item.data" :is="item.type")
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data () {
        return {
            
        }
    },
    computed: {
        ...mapGetters('videos', [
            'replyData'
        ])
    },
    methods: {
        async requestVideoReplies (query) {
            this.$store.dispatch('replies/requestVideoReplies', { ...query });
        },
    },
    created () {
        console.log(this.$route.query.videoTitle);
        this.requestVideoReplies(this.$route.query);
    }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/var.scss';
.reply-container {
    @include flex(column);
    background-color: #333;
    color: #EEE;

    .top {
        @include flex(column);
        @include padding(3vw);
        @include split-line(#555, false);

        position: fixed;
        z-index: 10;
        top: 0; left: 0; right: 0; width: 100vw;
        box-sizing: border-box;
        background-color: #333;

        .title {
            font-size: 16px;
        }
        .btns {

            button {
                margin: 2vw 2vw 2vw 0;
            }
        }

        .return-btn {
            position: absolute;
            top: 50%; right: 3vw;
            transform: translateY(-50%);
        }
    }
    .body {
        margin-top: 10vw;
    }
}
</style>

