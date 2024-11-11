const { VITE_PNG_ROUTE, VITE_SVG_ROUTE } = import.meta.env;

export const HOME = `${VITE_SVG_ROUTE}menu/home.svg`;
export const MAP = `${VITE_SVG_ROUTE}menu/map.svg`;
export const ACTIVITIES = `${VITE_SVG_ROUTE}menu/activities.svg`;
export const CHATS = `${VITE_SVG_ROUTE}menu/chats.svg`;
export const PROFILE = `${VITE_SVG_ROUTE}menu/profile.svg`;

export const iconsMap = {
	HOME,
	MAP,
	ACTIVITIES,
	CHATS,
	PROFILE,
};
