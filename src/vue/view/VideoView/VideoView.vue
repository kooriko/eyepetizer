<template lang="pug">
    div.video-container(v-if="video")
        video.video#video(ref="video" controls autoplay :src="video.playUrl")
        div.video-details(:style="`margin-top: ${videoHeight}px;`")
            transition(name="slide" @after-enter="changeContentShow(false)" @before-leave="changeContentShow(true)")
                div.slide-card.card-reply(v-show="card === 'reply'")
                    div.cover(:style="`background-image: url(${video.cover.blurred});`")
                    div.reply-options
                        img.avatar(src="" height="40" width="40")
                        input.ipt-reply(placeholder="发表你的评论…")
                        i.fa.fa-close.btn-close.f-small(@click="showCard('reply')") 关闭
                    component(v-for="(item, index) in replyData" :key="index" :is="item.type" :data="item.data")

            div.content(v-if="contentShow")
                div.cover(:style="`background-image: url(${video.cover.blurred});`")
                button.return(@click.prevent="$_backTo") 返回
                div.infos.section
                    h4.title {{ video.title }}
                    p.detail \#{{ video.category }} / {{ video.duration | secondToMin }} / {{ author.name }}
                    p.desc.f-small {{ video.description }} 
                    ul.consumption
                        li.item 喜欢 
                            span.value {{ consumption.collectionCount }}
                        li.item 分享 
                            span.value {{ consumption.shareCount }}
                        li.item(@click="showCard('reply')") 评论 
                            span.value {{ consumption.replyCount }}
                        li.item 
                            span.value 缓存
                ul.tags.section(v-if="tags.length")
                    li.tag(v-for="(item, index) in tags" :key="index")
                        div.tag-cover(:style="`background-image: url(${item.headerImage};`")
                        span.name \#{{ item.name }}#
                div.author.section
                    img.avatar(:src="author.icon")
                    div.detail
                        h5.title {{ author.name }}
                        p.desc {{ author.description }}

                component(v-for="(item, index) in relatedVideos" :key="index" :is="item.type" :data="item.data")
</template>

<script>
import { mapGetters } from 'vuex';
import { getVideoHeight } from '@/assets/util';

export default {
    filters: {
        secondToMin (val) {
            const arr = [ (val / 60) | 0, val % 60 ];
            return arr.map(item => String(item).padStart(2, '0')).join(':');
        }
    },
    data () {
        return {
            video: null,
            videoHeight: 0,
            card: '',
            contentShow: true,
        }
    },
    watch: {
        '$route.query.id' (after) {
            if (!after) this.$router.push({ name: 'home-recommand' });
            this.queryVideo(after);
            this.requestRelatedVideos(after);
        }
    },
    computed: {
        ...mapGetters('videos', [
            'getVideoById',
            'relatedVideos',
        ]),
        ...mapGetters('replies', [
            'replyData'
        ]),
        consumption () {
            if (!this.video) return false;
            return this.video.consumption;
        },
        author () {
            if (!this.video) return false;
            return this.video.author;
        },
        tags () {
            if (!this.video) return false;
            return this.video.tags.slice(0, 3);
        }
    },
    methods: {
        showCard (cardName) {
            this.card = this.card === cardName ?  '' : cardName;
        },
        changeContentShow (flag) {
            this.contentShow = flag;
        },
        async requestVideoReplies (id) {
            const params = { videoId: id };
            this.$store.dispatch('replies/requestVideoReplies', params);
        },
        async requestRelatedVideos (id) {
            const params = { id };
            this.$store.dispatch('videos/requestRelatedVideos', params);
        },
        async queryVideo (id) {
            const params = { id };
            const flag = await this.$store.dispatch('videos/queryVideo', params);

            const video = this.getVideoById(id);
            const videoInfo = video.playInfo[0];
            const videoHeight = getVideoHeight(videoInfo.width, videoInfo.height);
            this.videoHeight = videoHeight;
            this.video = video;
        }
    },
    created () {
        const { id } = this.$route.query;
        if (!id) this.$router.push({ name: 'home-recommand' });
        this.queryVideo(id);
        this.requestRelatedVideos(id);

        setTimeout(() => {
            this.requestVideoReplies(this.$route.query.id);
        });
    },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/var.scss';

.slide-enter-active, .slide-leave-active {
    transition: all .3s;
    top: 0;
}
.slide-enter, .slide-leave-to {
    top: 100vh;
}

.video-container {
    display: flex;
    flex-direction: column;

    .video {
        position: fixed;
        z-index: 100;
        width: 100vw;
    }
    .video-details {
        position: relative;
        color: #FFF;

        .cover {
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            z-index: -1;
            overflow: auto;
            background-size: cover;
            filter: brightness(.7);
        }

        .slide-card {
            position: absolute;
            z-index: 10;
        }
        .card-reply {
            .reply-options {
                @include flex(row, space-between, center);
                @include padding(3vw);
                background-color: rgba(0, 0, 0, .2);
                @include split-line(#999);

                .ipt-reply {
                    flex-grow: 1;
                }
                .btn-close {
                    margin-left: 2vw;
                }
            }
        }
        .content {
            position: relative;
            z-index: 5;
            overflow: hidden;
            .return {
                position: absolute;
                z-index: 2;
                right: 4vw;
                top: 9.7vw;
                background-color: unset;
                color: #FFF;
                border: 1px solid #FFF;
                border-radius: 5px;

            }
            .section {
                position: relative;
                padding: 0 4vw;
                &:after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: -200vw;
                    width: 500vw;
                    height: 1px;
                    background: #CCC;
                    transform: scale(.3);
                }
            }
            .infos {
                display: flex;
                position: relative;
                flex-direction: column;
                align-items: flex-start;
                padding-top: 5px;
                padding-bottom: 10px;

                .title {
                    padding: 5px 0;
                    font-size: 16px;
                }
                .detail {
                    font-size: 12px;
                    font-weight: 300;
                }
                .desc {
                    padding: 14px 0;
                    font-weight: 300;
                }
                .consumption {
                    display: flex;
                    flex-direction: row;
                    .item {
                        margin-right: 20px;
                        .value {
                            font-size: 12px;
                            font-weight: 300;
                        }
                    }
                }
            }
            .tags {
                padding-top: 15px;
                padding-bottom: 15px;
                display: flex;
                flex-direction: row;

                .tag {
                    flex-grow: 1;
                    position: relative;
                    text-align: center;
                    height: 50px;
                    border-radius: 5px;
                    overflow: hidden;

                    .tag-cover {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        background-size: cover;
                        left: 50%; 
                        filter: brightness(.5);
                        transform: translateX(-50%);
                    }
                    .name {
                        position: relative;
                        line-height: 50px;
                        z-index: 2;
                    }
                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
            .author {
                display: flex;
                padding-top: 20px;
                padding-bottom: 20px;
                .avatar {
                    height: 40px;
                    width: 40px;
                    margin-right: 10px;
                    border-radius: 50%;
                }
                .detail {
                    display: flex;
                    flex-direction: column;
                    .desc {
                        font-size: 12px;
                        font-weight: 300;
                    }
                }
            }
        }
    }
}
</style>
