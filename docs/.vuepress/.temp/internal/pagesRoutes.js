import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-5af0cb22","/artical/ConcurrentHashMap.html",{"title":"ConcurrentHashMap"},["/artical/ConcurrentHashMap","/artical/ConcurrentHashMap.md"]],
  ["v-e52cd900","/artical/",{"title":"依赖环境"},["/artical/index.html","/artical/README.md"]],
  ["v-72acd7a0","/artical/vue-cli.html",{"title":"Vue 脚手架"},["/artical/vue-cli","/artical/vue-cli.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
