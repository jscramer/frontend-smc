//General App
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//Pinia store management
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

//Vuetify
import vuetifyConfig from './plugins/vuetify'
app.use(vuetifyConfig)

//Vue router
import router from './router/router'
app.use(router)

//Apexcharts
import VueApexCharts from "vue3-apexcharts";
app.use(VueApexCharts);

//Declaring components
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
app.component('Datepicker', Datepicker);
import BottomNavigation from './components/BottomNavigation.vue'
app.component('BottomNavigation',BottomNavigation)

app.mount('#app')

