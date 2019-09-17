import Vue from 'vue'

import Server from './server'
import { createRouter } from './router'

export default function createApp (context) {
  const router = createRouter()
  const app =  new Vue({
    router,
    render: h => h(Server, {
      props: {
        contentData: context.body
      }
    }),
  })
  return { app, router }
}
