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
				component: () => import("@/views/home/Feed.vue"),
			},
			{
				path: "tab1/search",
				component: () => import("@/views/home/Search.vue"),
			},
			{
				path: "tab2",
				component: () => import("@/views/home/Tab2Page.vue"),
			},
			{
				path: "tab3",
				component: () => import("@/views/home/Tab3Page.vue"),
			},
			{
				path: "tab4",
				component: () => import("@/views/home/Tab4Page.vue"),
			},
			{
				path: "tab5",
				component: () => import("@/views/home/Tab5Page.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
