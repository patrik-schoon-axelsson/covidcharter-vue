import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'materialize-css/dist/css/materialize.min.css';


let app = createApp(App);

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
