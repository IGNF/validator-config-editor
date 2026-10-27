import '@fontsource/open-sans/latin-400.css'
import '@fontsource/open-sans/latin-600.css'
import '@fontsource/open-sans/latin-700.css'
import '@fontsource/fira-sans/latin-500.css'
import '@fontsource/fira-sans/latin-600.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './theme.css'
import { vuetify } from './vuetify'

createApp(App).use(createPinia()).use(vuetify).mount('#app')
