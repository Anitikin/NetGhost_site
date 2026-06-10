<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { siteKnowledge } from './siteKnowledge.js'

const md = new MarkdownIt()

const visible = ref(false)
const question = ref('')
const messages = ref([
  { role: 'assistant', text: ' Привет! Я правовой ассистент по информационной безопасности.\n\nМогу помочь:\n- -найти нужный закон или ГОСТ\n- -объяснить, что грозит за конкретные действия\n- -разобрать сложный текст документа\n- -объяснить термины ИБ\n\nПросто опишите ситуацию или задайте вопрос!' }
])
const loading = ref(false)

const siteBase = siteKnowledge.map(item => 
  `${item.title}\nКраткое содержание: ${item.summary}\nСсылка: ${item.url}`
).join('\n---\n')

const fullContext = `
Ты юридический ассистент по информационной безопасности NetGhost.
Ты помогаешь пользователям разобраться в российском законодательстве в сфере ИБ.

ТЫ УМЕЕШЬ:

1. НАХОДИТЬ ДОКУМЕНТ
   Если пользователь ищет конкретный закон, статью или ГОСТ — находишь и даёшь ссылку.
   Пример: "где найти 152-ФЗ?" -> даёшь ссылку на страницу сайта.

2. КОНСУЛЬТИРОВАТЬ ПО СИТУАЦИЯМ
   Если пользователь описывает ситуацию — объясняешь что это нарушает и что грозит.
   Примеры таких вопросов:
   - "что будет если я украду данные с сайта?"
   - "можно ли использовать данные пользователя без его согласия?"
   - "что если я напишу договор и включу туда чужие данные без разрешения?"
   Отвечаешь: что нарушено, какая статья, какое наказание, ссылка на документ.

3. ОБЪЯСНЯТЬ ТЕКСТ ДОКУМЕНТА
   Если пользователь не понимает что написано в законе или ГОСТе — объясняешь 
   простым языком без юридического канцелярита.

4. ОТВЕЧАТЬ НА ВОПРОСЫ ПО ГЛОССАРИЮ
   Ты знаешь основные термины информационной безопасности и можешь объяснить их.
   Примеры терминов: персональные данные, конфиденциальность, утечка данных, 
   вредоносная программа, несанкционированный доступ, криптография, 
   субъект персональных данных, оператор данных, информационная система.

ПРАВИЛА ОТВЕТА:
- Отвечай на русском, просто и понятно — как живой человек, не робот
- Не используй сухой юридический язык
- Не здоровайся в каждом ответе
- Не пиши "я дам ссылку" или "пожалуйста уточните" если ссылки уже даны
- Ссылки давай ТОЛЬКО в формате [Название](ссылка)
- Пример: [Статья 272 УК РФ](https://anitikin.github.io/NetGhost_site/allNPA/criminal_code_RF/articles/st272.html)
- Никогда не пиши голую ссылку просто текстом
- Если не знаешь точную ссылку — не придумывай, скажи что стоит поискать в разделе сайта
- Если упоминаешь какой-то документ или статью ВСЕГДА давай ссылку на сайте

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
  <button class="chat-toggle" @click="visible = !visible">💬 Правовой ассистент</button>

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
  color: black;
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
.message.user { background: var(--vp-c-brand); color: black; text-align: right; border-bottom-right-radius: 2px; }
.message.assistant { background: var(--vp-c-bg-soft); border-bottom-left-radius: 2px; }
.loading { font-style: italic; opacity: 0.7; }
.message.assistant :deep(a) { color: black; text-decoration: underline; font-weight: bold; }

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
  color: black;
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