import Vue from 'vue'

import Server from './server'
import { createRouter } from './router'
import i18n from './i18n'

export default function createApp (context) {
  const router = createRouter()
  const app =  new Vue({
    router,
    i18n,
    render: h => h(Server, {
      props: {
        contentData: context,
      }
    }),
  })
  return { app, router }
}
