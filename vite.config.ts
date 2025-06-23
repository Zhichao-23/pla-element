import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
	plugins: [vue(), vueJsx()],
	css: {
		postcss: {
			plugins: [postcssPresetEnv(), autoprefixer()],
		},
	},
});
