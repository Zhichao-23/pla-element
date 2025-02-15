import { defineConfig } from "vitepress";
import {
	containerPreview,
	componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Pla-Element",
	description: "A UI repository.",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "Home", link: "/" }],

		sidebar: [
			{
				text: "快速开始",
				items: [{ text: "快速开始", link: "/quick-start" }],
			},
			{
				text: "基础组件",
				collapsed: false,
				items: [{ text: "Button 按钮", link: "components/Button" }],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/vuejs/vitepress" },
		],
	},

	markdown: {
		config(md) {
			md.use(containerPreview);
			md.use(componentPreview);
		},
	},
});
