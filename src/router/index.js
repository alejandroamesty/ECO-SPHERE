import { createRouter, createWebHistory } from "@ionic/vue-router";
import { NavBar } from "../components/index";

const routes = [
	{
		path: "/",
		redirect: "/tabs/feed",
	},
	{
		path: "/tabs/",
		component: NavBar,
		children: [
			{
				path: "",
				redirect: "/tabs/feed",
			},
			{
				path: "feed",
				component: () => import("@/views/feed/Feed.vue"),
			},
			{
				path: "feed/search",
				component: () => import("@/views/feed/Search.vue"),
			},
			{
				path: "maps",
				component: () => import("@/views/maps/Maps.vue"),
			},
			{
				path: "activities",
				component: () => import("@/views/activities/Activities.vue"),
			},
			{
				path: "chats",
				component: () => import("@/views/chats/Chats.vue"),
			},
			{
				path: "profile",
				component: () => import("@/views/profile/Profile.vue"),
			},
			{
				path: "profile/carbon-footprint",
				component: () => import("@/views/carbon-footprint/CarbonFootprint.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
