import { defineConfig } from 'vitepress'
import sidebar from './sidebar'
import nav from './nav'
export default defineConfig({
  appearance: true,
  title: 'Yomuki',
  titleTemplate: '明天吃什么',
  description: 'Yomuki的日常记录', // 网站描述 in html <meta>
  lang: 'zh-CN',
  markdown: {
    lineNumbers: true // 显示代码行数
  },
  lastUpdated: true,
  themeConfig: {
    sidebar,
    nav,
    lastUpdatedText: 'Updated', // 最后更新时间文本
    logo: '/avatar.png', // 导航栏左侧头像
    footer: {
      // message: 'Released under the MIT License.',
      copyright: '备案号：浙ICP备19025079号'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: [2, 6],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YomukiZRJ/yomuki-blog' }
    ]
  }
})
