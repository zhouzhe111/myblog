const {
    copyCode
} = require("vuepress-plugin-copy-code2");

module.exports = {
    // base: '/zhouzhe111.github.io/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    lang: "zh-CN",
    title: 'jjzhou的博客',
    description: 'jjzhou的博客',
    head: [
        ['link', {
            rel: 'icon',
            href: '/smile.png'
        }],
        //增加manifest.json
        // ['link', {
        //     rel: '办公',
        //     href: '/办公.json'
        // }],
    ],
    theme: "@vuepress/theme-default",
    themeConfig: {
        repo: 'https://github.com/zhouzhe111/zhouzhe111.github.io',
        logo: '/植物.png',
        lastUpdated: false,
        navbar: [ // 导航栏配置
            {
                text: '首页',
                link: '/'
            },
            {
                text: '文章',
                link: '/artical/'
            },
            {
                text: '留言',
                link: '/mess/'
            },
            {
                text: '友链',
                link: '/chain/'
            },
            {
                text: "关于",
                link: '/about/'
            }
        ],
        sidebar: {
            "/artical/": [{
                text: "文章",
                children: ["/artical/", "/artical/ConcurrentHashMap.md", "/artical/vue-cli.md"],
            }, ]
        },
        // sidebarDepth: 3, // 侧边栏显示2级
    },
    plugins: [
        // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
        copyCode({
            // 插件选项
            pure: true,
        }), [
            "@vuepress/plugin-search",
            {
                locales: {
                    "/": {
                        placeholder: "Search",
                    },
                    "/zh/": {
                        placeholder: "搜索",
                    },
                },
            },
        ],
    ]
}