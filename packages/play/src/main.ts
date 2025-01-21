import { createApp } from "vue";
import App from "./App.vue";
import installer from "placidity";

const app = createApp(App);
app.use(installer);
app.mount("#app");
