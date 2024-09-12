import { createApp, App } from 'vue'
import './style.css'
import vuedirectives from '@pnpm-monorepo/vuedirectives'
import MyApp from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const directives = {
  install: function (app: App<Element>) {
    Object.entries(vuedirectives).forEach(([key, value]) => {
      // @ts-ignore
      app.directive(key, value)
    })
  }
}

createApp(MyApp).use(router).use(Antd).use(directives).mount('#app')
