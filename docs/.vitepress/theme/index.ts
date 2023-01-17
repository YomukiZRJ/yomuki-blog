import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import NavUl from '../components/nav-ul/index.vue'
import ImageBox from '../components/image-box/index.vue'
import './style/var.css'
export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp ({ app }) {
    app.component('NavUl', NavUl)
    app.component('ImageBox', ImageBox)
  }
}
