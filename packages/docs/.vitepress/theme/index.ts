import DefaultTheme from "vitepress/theme";
import { ElementPlusContainer } from "vitepress-demo-preview-component";
import "vitepress-demo-preview-component/_product/style.css";
import "pla-element/dist/index.css";
import plaElement from "pla-element";

export default {
	...DefaultTheme,
	enhanceApp({ app }: { app: App }) {
		app.component("demo-preview", ElementPlusContainer);
		app.use(plaElement);
	},
};
