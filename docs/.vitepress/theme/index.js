import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomePage from './components/HomePage.vue'
import PdfViewer from './components/PdfViewer.vue'  

// Импортируем чат-агента и его стили
import Documate from '@documate/vue'
import '@documate/vue/dist/style.css'

export default {
  extends: DefaultTheme,
  
  // Вставляем кнопку на сайт
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Этот слот гарантирует, что кнопка появится внизу экрана, не ломая шапку сайта
      'layout-bottom': () => h('div', { 
        style: 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;' 
      }, [
        h(Documate, {
          // Пока бэкенда нет, оставляем пустую ссылку, чтобы просто увидеть кнопку
          endpoint: '', 
          placeholder: 'Задайте вопрос по ИБ...',
          buttonLabel: 'ИИ-Ассистент'
        })
      ])
    })
  },

  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('PdfViewer', PdfViewer)
  }
}