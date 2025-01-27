import vue from "@vitejs/plugin-vue";
import { defineConfig, type PluginOption } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [vue(), dts() as PluginOption],
	build: {
		outDir: "dist/umd",
		lib: {
			entry: "./index.ts",
			name: "Placidity",
			fileName: "placidity",
			formats: ["umd"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
				assetFileNames: (chunkInfo) => {
					if (chunkInfo.name == "style.css") return "index.css";
					return chunkInfo.name || "index.css";
				},
			},
		},
	},
});
