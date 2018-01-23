<template lang="pug">
    div.m-reply-card
        img.avatar(:src="user.avatar" width="40" height="40")
        div.content
            p.top
                span.nick-name.g-title {{ user.nickname }}
                span.lick-point.g-title
                    i {{ data.likeCount }}
                    span 赞
            span.g-desc(v-if="parentReply")
            p.reply.f-small {{ data.message }}
            div.parent-reply-container(v-if="parentReply")
                img.avatar(:src="parentReplyUser.avatar" width="30" height="30")
                div.parent-content
                    p.parent-nick-name.f-small {{ parentReplyUser.nickname }}
                    p.parent-reply.f-small {{ parentReply.message }}
            p.bottom.f-small
                span(v-if="parentReply") 查看对话
                span 回复
                span {{ time }}
</template>
<script>
export default {
    name: 'reply',
    props: {
        data: Object
    },
    computed: {
        user () {
            return this.data.user;
        },
        time () {
            const createTime = moment(this.data.createTime);
            const flag = createTime.isBetween(moment().startOf('day'), moment().endOf('day'));
            return flag ? createTime.fromNow() : createTime.format('LL');
        },
        parentReply () {
            return this.data.parentReply;
        },
        parentReplyUser () {
            return this.parentReply ? this.parentReply.user : null;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../styles/var.scss';

.m-reply-card {
    @include flex(row);
    padding: 3vw 0 3vw 3vw;

    .content {
        flex-grow: 1;
        // overflow: hidden;
        padding-right: 3vw;
        @include flex(column);
        @include split-line(#555);

        .top {
            width: 100%;
            @include flex(row, space-between);
        }

        .reply {
            margin-top: 3vw;
        }

        .parent-reply-container {
            @include flex(row);
            @include padding(3vw);
            box-sizing: border-box;
            margin-top: 2vw;
            width: 100%;
            background: rgba(0, 0, 0, .3);
            .parent-reply {
                margin-top: 1vw;
            }
        }
        .bottom {
            margin: 3vw 0;
            span {
                margin-right: 5vw;
            }
        }
    }
}
</style>
