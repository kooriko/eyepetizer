<template lang="pug">
    div.m-horizontal-scroll-card
        ul.card-list
            component.scroll-card(v-for="(item, index) in list" :is="item.type" :data="item.data" :key="index")
</template>

<script>
export default {
    name: 'horizontalScrollCard',
    props: {
        data: Object
    },
    computed: {
        list () {
            const { itemList } = this.data;
            return itemList;
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../styles/var.scss';
.m-horizontal-scroll-card {
    height: 220px;
    padding: 3vw 0;

    .card-list {
        @include flex(row);
        white-space: nowrap;
        padding-bottom: 40px;

        .scroll-card {
            flex-shrink: 0;
            width: 94vw;

            &:first-child {
                padding-left: 3vw;
            }
            &:last-child {
                padding-right: 3vw;
            }
            &:not(:last-child){
                padding-right: 1.5vw;
            }
        }
    }
    
}
</style>
