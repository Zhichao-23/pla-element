import { createApp } from "vue";
import App from "./src/App.vue";
import "pla-element/dist/es/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);


createApp(App).mount("#app");

