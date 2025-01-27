import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";

export default defineConfig({
	css: {
		postcss: {
			plugins: [postcssPresetEnv, autoprefixer()],
		},
		preprocessorOptions: {
			sass: {},
		},
	},
});
