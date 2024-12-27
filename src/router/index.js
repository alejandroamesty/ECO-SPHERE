import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useGlobalStore } from '../stores/globalStore';
import { NavBar } from '../components/index';

const routes = [
	{
		path: '/',
		redirect: '/auth/on-boarding',
	},
	{
		path: '/auth/on-boarding',
		component: () => import('@/views/auth/OnBoarding.vue'),
	},
	{
		path: '/auth/login',
		component: () => import('@/views/auth/Login.vue'),
	},
	{
		path: '/auth/forgot-password',
		component: () => import('@/views/auth/forgot-password/ForgotPassword.vue'),
	},
	{
		path: '/auth/verify-code',
		component: () => import('@/views/auth/forgot-password/VerifyCode.vue'),
	},
	{
		path: '/auth/reset-password',
		component: () => import('@/views/auth/forgot-password/ResetPassword.vue'),
	},
	{
		path: '/auth/register',
		component: () => import('@/views/auth/Register.vue'),
	},
	{
		path: '/carbon-footprint',
		component: () => import('@/views/carbon-footprint/CarbonFootprint.vue'),
	},
	{
		path: '/tabs/',
		component: NavBar,
		children: [
			{
				path: '',
				redirect: '/tabs/feed',
			},
			{
				path: 'feed',
				component: () => import('@/views/feed/Feed.vue'),
			},
			{
				path: 'feed/search',
				component: () => import('@/views/feed/Search.vue'),
			},
			{
				path: 'maps',
				component: () => import('@/views/maps/Maps.vue'),
			},
			{
				path: 'activities',
				component: () => import('@/views/activities/Activities.vue'),
			},
			{
				path: 'chats',
				component: () => import('@/views/chats/Chats.vue'),
			},
			{
				path: 'profile',
				component: () => import('@/views/profile/Profile.vue'),
			},
		],
	},
	{
		path: '/post',
		component: () => import('@/views/feed/Post.vue'),
	},
	{
		path: '/private-chat',
		component: () => import('@/views/chats/PrivateChat.vue'),
	},
	{
		path: '/community-chat',
		component: () => import('@/views/chats/CommunityChat.vue'),
	},
	{
		path: '/user-profile',
		component: () => import('@/views/feed/User.vue'),
	},
	{
		path: '/community-profile',
		component: () => import('@/views/feed/Community.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

/**
 * Autentifica el usuario antes de acceder a las rutas protegidas.
 */
router.beforeEach((to, from, next) => {
	const globalStore = useGlobalStore();

	if (globalStore.isAuthenticated) {
		if (to.path.startsWith('/auth')) {
			return next('/tabs/feed');
		}
	} else {
		if (!to.path.startsWith('/auth') && to.path !== '/auth/on-boarding') {
			return next('/auth/on-boarding');
		}
	}
	next();
});

export default router;
