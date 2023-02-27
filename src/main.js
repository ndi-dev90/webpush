import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

//import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

function register() {
  navigator.serviceWorker.register('../../sw.js').then((registration) => {
    registration.id = `appsw`
    return registration
  })
}
register()

const vuetify = createVuetify({
  components,
  directives
})
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(vuetify)

app.mount('#app')

watch(
  pinia.state,
  (state) => {
    window.localStorage.setItem(`noti-app`, JSON.stringify(state))
  },
  { deep: true }
)
