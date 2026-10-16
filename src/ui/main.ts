import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './vuetify'

createApp(App).use(createPinia()).use(vuetify).mount('#app')
