import type { DefaultTheme } from 'vitepress'
const nav: DefaultTheme.Config['nav'] = [
  {
    text: '日常',
    items: [
      {
        text: '随笔',
        link: '/informal-essay/'
      },
      {
        text: '速查',
        link: '/quick-check/'
      }
    ]
  },
  {
    text: '学到老，活到老',
    items: [
      {
        text: '基础',
        link: '/study/'
      },
      {
        text: '前端基建',
        link: '/infrastructure/about'
      },
      {
        text: 'WebGL',
        link: '/webgl/about'
      },
      {
        text: 'WebGIS',
        link: '/webgis/about'
      },
      {
        text: '架构 - 从入门到放弃',
        link: '/framework/'
      },
      {
        text: '架构 - 构建',
        link: '/bundlers/'
      }
    ]
  },
  { text: '前端屠龙宝刀点击就送', link: '/tools/' }
]
export default nav
