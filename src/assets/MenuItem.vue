<template lang="pug">
    li.eye-menu-item(@click="clickHandler" :style="`width: ${this.width ? this.width : 'unset' }`" :class="[ isActive ? 'is-active' : '' ]")
        slot
</template>

<script>
export default {
    name: 'eye-menu-item',
    props: {
        index: String,
        width: String
    },
    computed: {
        menu () {
            return this.$parent;
        },
        isActive () {
            return this.menu.activeIndex === this.index;
        }
    },
    methods: {
        clickHandler () {
            this.$bus.$emit('handleClick', this.index);
        }
    }
}
</script>

<style lang="scss">
.eye-menu-item {
    color: #888;
    font-size: 12px;
    width: 55px;
    font-weight: 500;
    display: inline-block;
    text-align: center;

    &.is-active {
        color: #444;
    }
}
</style>
