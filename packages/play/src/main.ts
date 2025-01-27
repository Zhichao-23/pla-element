import { createApp } from "vue";
import App from "./App.vue";
import installer from "placidity";
import "placidity/dist/index.css";

const app = createApp(App);
// app.use(installer);
app.mount("#app");
