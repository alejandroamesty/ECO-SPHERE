import { createRouter, createWebHistory } from "@ionic/vue-router";
import { NavBar } from "../components/index";

const routes = [
	{
		path: "/",
		redirect: "/tabs/tab1",
	},
	{
		path: "/tabs/",
		component: NavBar,
		children: [
			{
				path: "",
				redirect: "/tabs/tab1",
			},
			{
				path: "tab1",
				component: () => import("@/views/feed/Feed.vue"),
			},
			{
				path: "tab1/search",
				component: () => import("@/views/feed/Search.vue"),
			},
			{
				path: "tab2",
				component: () => import("@/views/maps/Maps.vue"),
			},
			{
				path: "tab3",
				component: () => import("@/views/activities/Activities.vue"),
			},
			{
				path: "tab4",
				component: () => import("@/views/chats/Chats.vue"),
			},
			{
				path: "tab5",
				component: () => import("@/views/profile/Profile.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
