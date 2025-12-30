import 'vue-toastification/dist/index.css'

import { createPinia } from 'pinia'
import type { App } from 'vue'
import Toast, { POSITION } from 'vue-toastification'

import components from '~/components'
import { i18n } from '~/utils/i18n'

const pinia = createPinia()

function getCurrentContext() {
  if (typeof window === 'undefined')
    return 'background'
  if (window.location.protocol === 'chrome-extension:' || window.location.protocol === 'moz-extension:') {
    if (window.location.pathname.includes('popup'))
      return 'popup'
    if (window.location.pathname.includes('options'))
      return 'options'
    return 'background'
  }
  return 'content-script'
}

export async function setupApp(app: App) {
  const context = getCurrentContext()

  // Inject a globally available `$app` object in template
  app.config.globalProperties.$app = { context }

  // Provide access to `app` in script setup with `const app = inject('app')`
  app.provide('app', app.config.globalProperties.$app)

  // Here you can install additional plugins for all contexts: popup, options page and content-script.
  // example: app.use(i18n)
  // example excluding content-script context: if (context !== 'content-script') app.use(i18n)
  app.use(i18n)
  app
    .use(Toast, {
      transition: 'Vue-Toastification__fade',
      maxToasts: 20,
      newestOnTop: true,
      position: POSITION.TOP_RIGHT,
    })
  app.use(components)
  app.use(pinia)
}
