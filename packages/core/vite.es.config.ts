import vue from "@vitejs/plugin-vue";
import { readdirSync } from "fs";
import { filter, map } from "lodash-es";
import { defineConfig, type PluginOption } from "vite";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";
import mvFilesPlugin from "./plugins/mv-files-plugin";

const getDirectoriesSync = (basePath: string) => {
	const entries = readdirSync(basePath, { withFileTypes: true });

	return map(
		filter(entries, (entry) => entry.isDirectory()),
		(entry) => entry.name
	);
};

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

export default defineConfig({
	build: {
		lib: {
			entry: "./index.ts",
			name: "pla-element",
			fileName: "index",
			formats: ["es"],
		},
		outDir: "dist/es",
		cssCodeSplit: false,
		emptyOutDir: true,
		cssMinify: true,
		minify: false,
		rollupOptions: {
			external: [
				"vue",
				"@fortawesome/fontawesome-svg-core",
				"@fortawesome/free-solid-svg-icons",
				"@fortawesome/vue-fontawesome",
				"@popperjs/core",
				"async-validator",
			],
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						return "vendor";
					}
					if (id.includes("packages/hooks")) {
						return "hooks";
					}
					if (
						id.includes("packages/utils") ||
						id.includes("plugin-vue:export-helper")
					) {
						return "utils";
					}
					console.log(id)

					for (const dirName of getDirectoriesSync("../components")) {
						if (id.includes(`packages/components/${dirName}`)) {
							return `${dirName}`;
						}
					}
				},
				assetFileNames: ({ names, type }) => {
					if (names && type == "asset") {
						console.log(names[0])

						const dirNames = getDirectoriesSync("../components");
						const assetName = names[0];

						for (const dirName of dirNames) {
							if (dirName + ".css" === assetName) {
								return `theme/${dirName}[extname]`;
							}
						}
					}

					return "index.css"; // default return value
				},
			},
		},
	},
	plugins: [
		vue(),
		dts({
			tsconfigPath: "../../tsconfig.build.json",
			outDir: "dist/types",
		}) as PluginOption,
		// rmFilesPlugin({
		// 	files: ["./dist/es", "./dist/theme", "./dist/types"],
		// }),
		mvFilesPlugin({
			from: "dist/es/theme",
			to: "dist/theme",
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
			format: {
				semicolons: false,
				shorthand: isProd, // 简写
				braces: !isProd,
				beautify: !isProd,
				comments: !isProd,
			},
			// 混淆
			mangle: {
				toplevel: isProd,
				eval: isProd,
				keep_classnames: isDev, // 保留函数名
				keep_fnames: isDev, // 保留类名
			},
		}),
	],
});
