import DefaultTheme from 'vitepress/theme'
import { h } from 'vue' 
import './custom.css'

import HomePage from './components/HomePage.vue'
import PdfViewer from './components/PdfViewer.vue'
import AIchat from './components/AIchat.vue' 


export default {
  extends: DefaultTheme, 

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(AIchat)
    })
  },

  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('PdfViewer', PdfViewer)
  }

} 
