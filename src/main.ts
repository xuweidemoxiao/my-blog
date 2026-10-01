import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import App from './App.vue'
import router from './router'
import './style.css'



const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false,
            cssVariables: true
        }
    },
    license: 'eyJpZCI6ImQ1Nzg2NmVhLTFmNGQtNDRmZi1iNzZlLTBlYjU2ZWQ3OTBhMyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODk4MjcxMjQsImV4cCI6MTgyMTM2MzEyNH0.qv0X5TOwnzftF1L9WSv-pJxVTNt8AkY2jtRWVTErGTC_MLAh9TVhNverVjR5OVtrV1aWnoIJxC3yQ6pFqCHOAQ'
});

app.use(createPinia())
app.use(router)

app.mount('#app')
