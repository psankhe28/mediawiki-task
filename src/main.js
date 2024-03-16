import { createApp } from 'vue'
import App from './App.vue'
import '@wikimedia/codex/dist/codex.style.css'
import router from './router/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
