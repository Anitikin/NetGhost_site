<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { siteKnowledge } from './siteKnowledge.js'

const md = new MarkdownIt()

const visible = ref(false)
const isScared = ref(false)
const question = ref('')
const messages = ref([
  { role: 'assistant', text: ' Привет! Я правовой ассистент по информационной безопасности.\n\nМогу помочь:\n- найти нужный закон или ГОСТ\n- объяснить, что грозит за конкретные действия\n- разобрать сложный текст документа\n- объяснить термины ИБ\n\nПросто опишите ситуацию или задайте вопрос!' }
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

2. КОНСУЛЬТИРОВАТЬ ПО СИТУАЦИЯМ
   Если пользователь описывает ситуацию — объясняешь что это нарушает и что грозит.

3. ОБЪЯСНЯТЬ ТЕКСТ ДОКУМЕНТА
   Объясняешь простым языком без юридического канцелярита.

4. ОТВЕЧАТЬ НА ВОПРОСЫ ПО ГЛОССАРИЮ
   Примеры терминов: персональные данные, конфиденциальность, утечка данных, 
   вредоносная программа, несанкционированный доступ, криптография.

ПРАВИЛА ОТВЕТА:
- Отвечай на русском, просто и понятно — как живой человек, не робот
- Не используй сухой юридический язык
- Не здоровайся в каждом ответе
- Не пиши "я дам ссылку" если ссылки уже даны
- Ссылки давай ТОЛЬКО в формате [Название](ссылка)
- Никогда не пиши голую ссылку просто текстом
- Если не знаешь точную ссылку — не придумывай
- Если упоминаешь документ или статью — ВСЕГДА давай ссылку

БАЗА СТРАНИЦ САЙТА:
${siteBase}
`

function onGhostClick() {
  visible.value = !visible.value
  isScared.value = true
  setTimeout(() => { isScared.value = false }, 800)
}

async function sendQuestion() {
  if (!question.value.trim() || loading.value) return
  const userQuery = question.value
  messages.value.push({ role: 'user', text: userQuery })
  question.value = ''
  loading.value = true
  try {
    const res = await fetch('https://netghost-ai-backend.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userQuery, context_text: fullContext })
    })
    const data = await res.json()
    if (data.answer) {
      messages.value.push({ role: 'assistant', text: data.answer })
    } else {
      throw new Error('Нет ответа')
    }
  } catch (error) {
    messages.value.push({ role: 'assistant', text: 'Ошибка при поиске. Проверьте соединение с сервером.' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button class="chat-toggle" @click="onGhostClick">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="60" height="72">
      <g class="gb">
        <path d="M18,65 Q18,22 50,22 Q82,22 82,65 L82,105 Q74,98 66,105 Q58,98 50,105 Q42,98 34,105 Q26,98 18,105 Z"
          fill="white" stroke="#222" stroke-width="1.5"/>

        <!-- Обычные глаза -->
        <ellipse v-show="!isScared" class="el" cx="37" cy="55" rx="8" ry="10" fill="white" stroke="#222" stroke-width="1.2"/>
        <ellipse v-show="!isScared" class="er" cx="63" cy="55" rx="8" ry="10" fill="white" stroke="#222" stroke-width="1.2"/>
        <ellipse v-show="!isScared" class="pl" cx="38" cy="57" rx="4" ry="5" fill="#222"/>
        <ellipse v-show="!isScared" class="pr" cx="64" cy="57" rx="4" ry="5" fill="#222"/>
        <circle v-show="!isScared" cx="40" cy="54" r="1.5" fill="white" opacity="0.8"/>
        <circle v-show="!isScared" cx="66" cy="54" r="1.5" fill="white" opacity="0.8"/>
        <!-- Обычный рот — улыбка -->
        <path v-show="!isScared" d="M40,72 Q50,80 60,72" fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round"/>

        <!-- Удивлённые глаза — большие -->
        <ellipse v-show="isScared" cx="37" cy="53" rx="11" ry="13" fill="white" stroke="#222" stroke-width="1.2"/>
        <ellipse v-show="isScared" cx="63" cy="53" rx="11" ry="13" fill="white" stroke="#222" stroke-width="1.2"/>
        <ellipse v-show="isScared" cx="37" cy="55" rx="6" ry="7" fill="#222"/>
        <ellipse v-show="isScared" cx="63" cy="55" rx="6" ry="7" fill="#222"/>
        <circle v-show="isScared" cx="39" cy="52" r="2.5" fill="white" opacity="0.9"/>
        <circle v-show="isScared" cx="65" cy="52" r="2.5" fill="white" opacity="0.9"/>
        <!-- Рот кружочком — удивление -->
        <ellipse v-show="isScared" cx="50" cy="78" rx="7" ry="8" fill="#222"/>
        <ellipse v-show="isScared" cx="50" cy="78" rx="4" ry="5" fill="#555"/>
      </g>
    </svg>
  </button>

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
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}
.chat-toggle:hover {
  filter: drop-shadow(0 6px 14px rgba(179,255,0,0.4));
}

.gb { animation: float 3s ease-in-out infinite; transform-origin: 50px 60px; }
.el { animation: blink 4s ease-in-out infinite; transform-origin: 35px 52px; }
.er { animation: blink 4s ease-in-out infinite 0.1s; transform-origin: 63px 52px; }
.pl { animation: look 5s ease-in-out infinite; transform-origin: 35px 54px; }
.pr { animation: look 5s ease-in-out infinite 0.2s; transform-origin: 63px 54px; }

@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-6px); }
}
@keyframes blink {
  0%,90%,100% { transform: scaleY(1); }
  95%         { transform: scaleY(0.05); }
}
@keyframes look {
  0%,100% { transform: translate(0,0); }
  30%     { transform: translate(2px,1px); }
  60%     { transform: translate(-2px,1px); }
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

.input-area { display: flex; gap: 10px; }
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
.input-area button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>