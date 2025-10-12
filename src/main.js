import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import { routes, createRouter } from './router'

export const createApp = ViteSSG(
  App,
  { routes, routerOptions: { createRouter } },
  ({ app, router, initialState, head }) => {
    // Install plugins
    // head is already provided by vite-ssg
    app.use(vuetify)
    app.use(i18n)
  }
)

