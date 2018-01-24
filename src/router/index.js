import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

import Header from '@/vue/components/Header';
import Footer from '@/vue/components/Footer';

import BodyView from '@/vue/view/homeView/BodyView';
import VideoView from '@/vue/view/VideoView/VideoView';
import ReplyView from '@/vue/view/ReplyView/ReplyView';
import CategoryView from '@/vue/view/CategoryView/CategoryView';
import TestView from '@/vue/view/TestView';

import Recommand from '@/vue/view/homeView/Recommand';
import Daily from '@/vue/view/homeView/Daily';
import Discovery from '@/vue/view/homeView/Discovery';
import Category from '@/vue/view/homeView/Category';

Vue.use(Router);

const router = new Router({
  routes: [
    {
		path: '/',
		components: {
			header: Header,
			default: BodyView,
			footer: Footer
		},
		children: [
			{
				path: '/discovery',
				name: 'home-discovery',
				component: Discovery
			},
			{
				path: '/',
				name: 'home-recommand',
				component: Recommand
			},
			{
				path: '/daily',
				name: 'home-daily',
				component: Daily
			},
			{
				path: '/home',
				name: 'home-category',
				component: Category
			}
		]
    }, {
			path: '/subscription',
			name: 'subscription',
		}, {
			path: '/notification',
			name: 'notification'
		}, {
			path: '/me',
			name: 'me'
		}, {
			path: '/video',
			name: 'video',
			component: VideoView
		}, {
			path: '/reply',
			name: 'reply',
			component: ReplyView
		}, {
			path: '/category/:categoryId',
			name: 'category',
			component: CategoryView
		},
		{
			path: '/t',
			name: 'test',
			component: TestView
		}
	],
});

router.beforeEach((to, from, next) => {
	store.commit('ui/recordFromPath', from.path);
	next();
});

export default router;