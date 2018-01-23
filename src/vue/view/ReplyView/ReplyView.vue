<template lang="pug">
    section.reply-container
        div.top
            h3
        div.current-reply
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
        async requestVideoReplies (videoId) {
            this.$store.dispatch('videos/requestVideoReplies', { videoId });
        }
    },
    created () {
        console.log(this.$route.query.id);
        this.requestVideoReplies(this.$route.query.id);
    }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/var.scss';
.reply-container {
    @include flex(column);
    background-color: #333;
    color: #AAA;
}
</style>

