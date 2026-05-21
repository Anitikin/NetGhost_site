<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const visible = ref(false)
const question = ref('')
const messages = ref([
  { role: 'assistant', text: 'Привет! Я ИИ-поисковик по сайту NetGhost. Какой раздел или документ вы ищете?' }
])
const loading = ref(false)

const siteBase = `
БАЗА ЗНАНИЙ И СТРУКТУРА ССЫЛОК:
1. Главная: https://anitikin.github.io/NetGhost_site/
2. Конституция РФ: 
   - Формат ссылок: /NetGhost_site/allNPA/constitution/articles/st[НОМЕР].html
   - Пример: Статья 23 -> /NetGhost_site/allNPA/constitution/articles/st23.html
3. Федеральный закон РФ:
  - Формат ссылок: /NetGhost_site/allNPA/federal_law_RF/articles/fz[НОМЕР].html
  - Пример: ФЗ 63 -> /NetGhost_site/allNPA/constitution/articles/fz63.html
4. Уголовный кодекс РФ:
  - Формат ссылок: /NetGhost_site/allNPA/criminal_code_RF/articles/st[НОМЕР].html
  - Пример: Статья 274 -> /NetGhost_site/allNPA/criminal_code_RF/articles/st274.html 
  - Пример: Статья 274.1 -> /NetGhost_site/allNPA/criminal_code_RF/articles/st274.1.html или другая цифра после 274.[цифра]
`

const fullContext = `
ПРАВИЛА ОТВЕТА:
1. Отвечай кратко.
2. Если вопрос касается законов, кратко упомяни нужный НПА и дай ссылку на подходящий раздел сайта.
3. Обязательно выводи ссылку в формате [Название страницы](Ссылка).

БАЗА СТРАНИЦ САЙТА:
${siteBase}
`

async function sendQuestion() {
  if (!question.value.trim() || loading.value) return

  const userQuery = question.value
  messages.value.push({ role: 'user', text: userQuery })
  question.value = ''
  loading.value = true

  try {
    const res = await fetch('https://netghost-ai-backend.onrender.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: userQuery,
        context_text: fullContext
      })
    })

    const data = await res.json()
    
    if (data.answer) {
      messages.value.push({ role: 'assistant', text: data.answer })
    } else {
      throw new Error('Нет ответа от сервера')
    }

  } catch (error) {
    console.error('Ошибка:', error)
    messages.value.push({ role: 'assistant', text: 'Ошибка при поиске. Проверьте соединение с сервером.' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button class="chat-toggle" @click="visible = !visible">💬 Поиск по сайту</button>

  <div v-if="visible" class="chat-window">
    <div class="messages">
      <div 
        v-for="(msg, index) in messages" 
        :key="index" 
        :class="['message', msg.role]"
        v-html="md.render(msg.text)"
      ></div>
      <div v-if="loading" class="message assistant loading">Ищу ответ...</div>
    </div>

    <div class="input-area">
      <input 
        v-model="question" 
        @keyup.enter="sendQuestion" 
        placeholder="Что найти? Например: 152-ФЗ..."
        :disabled="loading"
      />
      <button @click="sendQuestion" :disabled="loading">Поиск</button>
    </div>
  </div>
</template>

<style scoped>
.chat-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, background-color 0.2s;
}

.chat-toggle:hover {
  transform: scale(1.05);
  background-color: var(--vp-c-brand-dark);
}

.chat-window { 
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 9999;
  border: 1px solid var(--vp-c-divider); 
  padding: 15px; 
  width: 350px; 
  background: var(--vp-c-bg); 
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.messages { height: 300px; overflow-y: auto; margin-bottom: 10px; padding-right: 5px; }
.message { margin: 8px 0; padding: 10px; border-radius: 8px; font-size: 0.9em; line-height: 1.4; }
.message.user { background: var(--vp-c-brand); color: white; text-align: right; border-bottom-right-radius: 2px; }
.message.assistant { background: var(--vp-c-bg-soft); border-bottom-left-radius: 2px; }
.loading { font-style: italic; opacity: 0.7; }
.message.assistant :deep(a) { color: var(--vp-c-brand); text-decoration: underline; font-weight: bold; }

.input-area {
  display: flex;
  gap: 10px;
}

.input-area input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.input-area button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.input-area button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>