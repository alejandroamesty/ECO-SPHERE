import { createRouter, createWebHistory } from '@ionic/vue-router';
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

export default router;
