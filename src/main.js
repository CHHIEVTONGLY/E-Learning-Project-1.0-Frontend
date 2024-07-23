import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import vue3GoogleLogin from "vue3-google-login";
const app = createApp(App); // Pass the root component (App) to createApp

app.use(vue3GoogleLogin, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
});

app.use(router); // Use the router in your app
app.mount("#app"); // Mount the app to the DOM element with id "app"
