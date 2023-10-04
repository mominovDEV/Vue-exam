import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../bootstrap-5.0.2-dist/css/bootstrap.min.css";
const app = createApp(App);

app.use(router);

app.mount("#app");
