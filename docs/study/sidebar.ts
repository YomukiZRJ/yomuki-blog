import cssData from './css/index.json'
export default [
  {
    text: '基础',
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: '目录',
        link: '/study/'
      },
      {
        text: '好文收集',
        link: '/study/article'
      },
      {
        text: 'SSE',
        link: '/study/base/see'
      },
      {
        text: '依赖注入模式',
        link: '/study/base/依赖注入模式'
      }
    ]
  },
  {
    text: 'TypeScript',
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: '指令',
        link: '/study/ts/ts指令'
      },
      {
        text: '类型',
        link: '/study/ts/类型'
      },
      {
        text: '类型系统',
        link: '/study/ts/类型系统'
      },
      {
        text: '类型层级',
        link: '/study/ts/类型层级'
      },
      {
        text: '逻辑运算',
        link: '/study/ts/逻辑运算'
      },
      {
        text: '内置工具类型',
        link: '/study/ts/内置工具类型'
      },
      {
        text: '工具类型拓展',
        link: '/study/ts/工具类型拓展'
      }
    ]
  },
  {
    text: 'vue',
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: '路由懒懒懒加载（按需载入）',
        link: '/study/vue/route-lazy-load'
      },
      {
        text: 'provide-inject',
        link: '/study/vue/provide-inject'
      },
      {
        text: 'vue2-to-vue3',
        link: '/study/vue/vue2-to-vue3'
      }
    ]
  },
  {
    text: 'css',
    collapsible: true,
    // collapsed: true,
    items: cssData
  },
  {
    text: '其他',
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: 'lodash - 数组',
        link: '/study/other/lodash-01'
      },
      {
        text: 'vueuse - 元素',
        link: '/study/other/vueuse-01'
      }
    ]
  },
  {
    text: '八股文sos',
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: '浏览器',
        link: '/study/eightPpartEssay/browser'
      },
      {
        text: 'css',
        link: '/study/eightPpartEssay/css'
      },
      {
        text: 'js',
        link: '/study/eightPpartEssay/js'
      }
    ]
  }
]
