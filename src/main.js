import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import "primevue/resources/themes/lara-dark-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css"
import 'primeicons/primeicons.css';

import App from './App.vue'
import store from './store'
import router from './router'

createApp(App).use(store).use(router).use(PrimeVue).use(ToastService).use(ConfirmationService).mount('#app')
