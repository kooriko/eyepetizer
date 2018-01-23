<template lang="pug">
    div.eye-menu
        ul.eye-menu-truth(ref="menu")
            slot
            div.hover-bar(ref="hoverBar" :style="`width: ${ hoverBarWidth }px; transform: translateX(${ translateX }px)`")
</template>

<script>
export default {
    name: 'eye-menu',
    props: {
        defaultIndex: {
            type: String,
            default: ''
        },
        itemWidth: {
            type: Number,
            default: 0
        },
        hoverBarWidth: {
            type: Number,
            default: 12
        }
    },
    data () {
        return {
            activeIndex: this.defaultIndex,
            realItemWidth: 0,
            translateX: 0
        }
    },
    watch: {
        defaultIndex (after) {
            this.activeIndex = after;
        },
        activeIndex: {
            handler (after, before) {
                const { menu, hoverBar } = this.$refs;
                if (after !== before) {
                    this.changeHandler(after);
                }
                this.changeTranslateX(after);
            }
        } 
    },
    methods: {
        changeHandler (index) {
            this.$emit('change', index);
        },
        changeTranslateX (index) {
            this.translateX = (this.realItemWidth - this.hoverBarWidth) / 2 + this.realItemWidth * index;
        }
    },
    created () {
        this.$bus.$off('handleClick');
        this.$bus.$on('handleClick', (index, times = 10) => {
            const { menu } = this.$refs;
            const originCenter = menu.scrollLeft + (menu.offsetWidth / 2);

            const newChild = menu.children[index];
            const newChildCenter = newChild.offsetLeft + (newChild.offsetWidth / 2);
            const dVal = newChildCenter - originCenter;

            let t = times;
            const menuScroll = () => {
                if (--t) {
                    menu.scrollLeft += dVal / times;
                    requestAnimationFrame(menuScroll);
                }
            }
            requestAnimationFrame(menuScroll);

            this.activeIndex = index;
        });
    },
    mounted () {
        const { menu } = this.$refs;

        this.$nextTick(() => {
            this.realItemWidth = menu.children[0].offsetWidth;
            this.changeTranslateX(this.activeIndex);
        });
    }
}
</script>

<style lang="scss">
@import '../styles/var.scss';

.eye-menu {
    width: 85vw;
    height: 40px;
    overflow: hidden;

    .eye-menu-truth {
        position: relative;
        @include flex(row);
        width: 100%;
        height: 40px;
        padding-top: 10px;
        white-space: nowrap;
        overflow-y: scroll;
        font-size: 0;

        .eye-menu-item {
            flex-shrink: 0;
        }

        .hover-bar {
            position: absolute;
            width: 12px;
            height: 3px;
            background: #666;
            bottom: 15px;
            transform: translateX(77px);
            transition: transform .3s;
        }
    }
}
</style>
