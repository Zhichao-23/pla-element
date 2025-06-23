import vue from "@vitejs/plugin-vue";
import { defineConfig, type PluginOption } from "vite";
import cpFilePlgin from "./plugins/cp-file-plugin";
import compression from "vite-plugin-compression2";
import rmFilesPlugin from "./plugins/rm-files-plugin";
import terser from "@rollup/plugin-terser";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

export default defineConfig({
	plugins: [
		vue(),
		rmFilesPlugin({
			files: ["dist/umd", "dist/index.css"],
		}),
		compression({
			include: /.(cjs|css)$/i,
		}) as PluginOption,
		cpFilePlgin({
			from: "dist/umd/index.css",
			to: "dist/index.css",
		}),
		terser({
			compress: {
				drop_console: isProd && ["log"],
				drop_debugger: true,
				passes: 3,
				global_defs: {
					"@DEV": JSON.stringify(isDev),
					"@PROD": JSON.stringify(isProd),
					"@TEST": JSON.stringify(isTest),
				},
			},
		}),
	],

	build: {
		outDir: "dist/umd",
		minify: false,
		lib: {
			entry: "./index.ts",
			name: "pla-element",
			fileName: "index",
			formats: ["umd"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
				assetFileNames: "index.css",
			},
		},
	},
});
