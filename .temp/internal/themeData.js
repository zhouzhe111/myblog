export const themeData = {
  "logo": "/植物.png",
  "lastUpdated": false,
  "navbar": [
    {
      "text": "首页",
      "link": "/"
    },
    {
      "text": "文章",
      "link": "/artical/"
    },
    {
      "text": "留言",
      "link": "/mess/"
    },
    {
      "text": "友链",
      "link": "/chain/"
    },
    {
      "text": "关于",
      "link": "/about/"
    }
  ],
  "sidebar": {
    "/artical/": [
      {
        "text": "文章",
        "children": [
          "/artical/",
          "/artical/ConcurrentHashMap.md",
          "/artical/linux命令.md",
          "/artical/vue-cli.md"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
