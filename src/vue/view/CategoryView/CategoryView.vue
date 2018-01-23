<template lang="pug">
    section.m-category-container
        div.header(:style="`background-image: url(${categoryInfo.headerImage})`")
            h3.g-title.title {{ categoryInfo.name }}
            p.f-small.f-light {{ categoryInfo.description }}
        eye-menu.navigator(:defaultIndex="tabIndex" @change="changeTabIndex")
            eye-menu-item.nav(v-for="(item, index) in tabInfo.tabList" width="25%" :key="index" :index="String(index)") {{ item.name }}
        div.main-body
            component(v-for="(item, index) in categoryData" :key="index" :is="item.type" :data="item.data")
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            tabIndex: '0'
        }
    },
    computed: {
        ...mapGetters('categories', [
            'categoryViewBatch',
            'categoryData'
        ]),
        categoryInfo () {
            return this.categoryViewBatch.categoryInfo;
        },
        tabInfo () {
            return this.categoryViewBatch.tabInfo;
        }
    },
    methods: {
        initCategory (params) {
            this.$store.dispatch('categories/getCategoryData', params);
            this.$store.dispatch('categories/getCategoryViewBatch', params);
        },
        changeTabIndex (index) {
            this.tabIndex = index;
        }
    },
    created () {
        const { categoryId } = this.$route.params;
        const params = Object.assign(_.cloneDeep(this.$route.query), { id: categoryId });
        this.initCategory(params);
    }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/var.scss';

.m-category-container {
    @include flex(column);
    .header {
        @include flex(column, center, center);
        color: #FFF;
        width: 100vw;
        height: 40vh;
        background-position: 50% 50%;
        background-size: cover;

        .title {
            font-size: 26px;
            margin-bottom: 10px;
        }
    }
    .navigator {
        @include flex(row);
        width: 100%;
        background-color: #EEE;

        .nav {
            font-size: 12px;
            text-align: center;
        }
    }
}
</style>
