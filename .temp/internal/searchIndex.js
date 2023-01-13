export const searchIndex = [
  {
    "title": "",
    "headers": [],
    "path": "/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "ConcurrentHashMap",
    "headers": [
      {
        "level": 2,
        "title": "1.一些重要的常量",
        "slug": "_1-一些重要的常量",
        "children": []
      },
      {
        "level": 2,
        "title": "2.putVal",
        "slug": "_2-putval",
        "children": []
      },
      {
        "level": 2,
        "title": "3.initTable",
        "slug": "_3-inittable",
        "children": []
      },
      {
        "level": 2,
        "title": "4.helpTransfer",
        "slug": "_4-helptransfer",
        "children": []
      },
      {
        "level": 2,
        "title": "4.transfer(难点)，只知道个大概还是没搞明白",
        "slug": "_4-transfer-难点-只知道个大概还是没搞明白",
        "children": []
      }
    ],
    "path": "/artical/ConcurrentHashMap.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Linux命令",
    "headers": [
      {
        "level": 2,
        "title": "1.简单系统命令",
        "slug": "_1-简单系统命令",
        "children": []
      },
      {
        "level": 2,
        "title": "2. Linux文件系统",
        "slug": "_2-linux文件系统",
        "children": []
      },
      {
        "level": 2,
        "title": "3. 文件管理命令",
        "slug": "_3-文件管理命令",
        "children": []
      },
      {
        "level": 2,
        "title": "4. 文本内容查看命令",
        "slug": "_4-文本内容查看命令",
        "children": []
      },
      {
        "level": 2,
        "title": "5. 文件查找",
        "slug": "_5-文件查找",
        "children": []
      },
      {
        "level": 2,
        "title": "6. 文件链接",
        "slug": "_6-文件链接",
        "children": []
      },
      {
        "level": 2,
        "title": "7. 系统管理",
        "slug": "_7-系统管理",
        "children": []
      },
      {
        "level": 2,
        "title": "8. 输出",
        "slug": "_8-输出",
        "children": []
      },
      {
        "level": 2,
        "title": "9. 管道",
        "slug": "_9-管道",
        "children": []
      },
      {
        "level": 2,
        "title": "10. 文件编辑",
        "slug": "_10-文件编辑",
        "children": []
      },
      {
        "level": 2,
        "title": "用户组",
        "slug": "用户组",
        "children": []
      },
      {
        "level": 2,
        "title": "用户",
        "slug": "用户",
        "children": []
      },
      {
        "level": 2,
        "title": "权限",
        "slug": "权限",
        "children": []
      },
      {
        "level": 2,
        "title": "系统软件管理",
        "slug": "系统软件管理",
        "children": [
          {
            "level": 3,
            "title": "rpm软件",
            "slug": "rpm软件",
            "children": []
          },
          {
            "level": 3,
            "title": "yum",
            "slug": "yum",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "Linux服务",
        "slug": "linux服务",
        "children": []
      },
      {
        "level": 2,
        "title": "ip设置",
        "slug": "ip设置",
        "children": [
          {
            "level": 3,
            "title": "防火墙",
            "slug": "防火墙",
            "children": []
          },
          {
            "level": 3,
            "title": "主机名",
            "slug": "主机名",
            "children": []
          },
          {
            "level": 3,
            "title": "ip映射",
            "slug": "ip映射",
            "children": []
          },
          {
            "level": 3,
            "title": "SSH",
            "slug": "ssh",
            "children": []
          },
          {
            "level": 3,
            "title": "免密登录",
            "slug": "免密登录",
            "children": []
          },
          {
            "level": 3,
            "title": "远程拷贝",
            "slug": "远程拷贝",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "必要软件安装",
        "slug": "必要软件安装",
        "children": []
      }
    ],
    "path": "/artical/linux%E5%91%BD%E4%BB%A4.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "依赖环境",
    "headers": [],
    "path": "/artical/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Vue 脚手架",
    "headers": [
      {
        "level": 2,
        "title": "开发模式配置",
        "slug": "开发模式配置",
        "children": []
      },
      {
        "level": 2,
        "title": "生产模式配置",
        "slug": "生产模式配置",
        "children": []
      },
      {
        "level": 2,
        "title": "其他配置",
        "slug": "其他配置",
        "children": []
      },
      {
        "level": 2,
        "title": "合并开发和生产配置",
        "slug": "合并开发和生产配置",
        "children": []
      },
      {
        "level": 2,
        "title": "优化配置",
        "slug": "优化配置",
        "children": []
      }
    ],
    "path": "/artical/vue-cli.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/404.html",
    "pathLocale": "/",
    "extraFields": []
  }
]

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  })
}
