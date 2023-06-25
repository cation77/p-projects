import { createApp, App } from 'vue'
import './style.css'
import vuedirectives from '@pnpm-monorepo/vuedirectives'
import MyApp from './App.vue'

const directives = {
  install: function (app: App<Element>) {
    Object.entries(vuedirectives).forEach(([key, value]) => {
      app.directive(key, value)
    })
  }
}

createApp(MyApp).use(directives).mount('#app')
