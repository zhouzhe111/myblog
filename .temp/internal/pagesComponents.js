import { defineAsyncComponent } from 'vue'

export const pagesComponents = {
  // path: /
  "v-8daa1a0e": defineAsyncComponent(() => import(/* webpackChunkName: "v-8daa1a0e" */"E:/blog/.temp/pages/index.html.vue")),
  // path: /artical/ConcurrentHashMap.html
  "v-5af0cb22": defineAsyncComponent(() => import(/* webpackChunkName: "v-5af0cb22" */"E:/blog/.temp/pages/artical/ConcurrentHashMap.html.vue")),
  // path: /artical/linux%E5%91%BD%E4%BB%A4.html
  "v-226436c6": defineAsyncComponent(() => import(/* webpackChunkName: "v-226436c6" */"E:/blog/.temp/pages/artical/linux命令.html.vue")),
  // path: /artical/
  "v-e52cd900": defineAsyncComponent(() => import(/* webpackChunkName: "v-e52cd900" */"E:/blog/.temp/pages/artical/index.html.vue")),
  // path: /artical/vue-cli.html
  "v-72acd7a0": defineAsyncComponent(() => import(/* webpackChunkName: "v-72acd7a0" */"E:/blog/.temp/pages/artical/vue-cli.html.vue")),
  // path: /404.html
  "v-3706649a": defineAsyncComponent(() => import(/* webpackChunkName: "v-3706649a" */"E:/blog/.temp/pages/404.html.vue")),
}
