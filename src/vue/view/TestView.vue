<template lang="pug">
    div
        button(@click="show = !show") 点击一哈！
        transition(name="fade")
            h1(v-show="show") test
</template>
<script>
export default {
    data () {
        return {
            show: true
        }
    }
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
