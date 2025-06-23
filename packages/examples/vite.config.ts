import {defineConfig} from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";

export default defineConfig({
    plugins: [vuePlugin(), vueJsxPlugin()]
})