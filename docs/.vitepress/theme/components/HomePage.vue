<template>
  <div class="home-page">

    <!-- HERO -->
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">Добро пожаловать<br>на NetGhost</h1>
        <p class="hero__desc">
          Наш сайт с AI-ассистентом собрал для вас полный стек
          нормативно-правовых актов и методической базы в сфере ИБ
        </p>
      </div>
      <div class="hero__ghost">
        <img src="/images/ghost_big.png" alt="ghost" width="250" />
      </div>
      
    </section>

    <!-- БАЗА ЗНАНИЙ -->
    <section class="knowledge">
      <div class="knowledge__label">База знаний</div>
      <div class="knowledge__grid">
        <a
          v-for="(card, index) in cards"
          :key="index"
          :href="card.link"
          class="card"
          :class="{ 'card--accent': card.accent, 'card--dark': card.dark }"
        >
          <span class="card__title">{{ card.title }}</span>
          <span class="card__btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
              <path d="M6 8h4M8 6l2 2-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Читать
          </span>
        </a>
      </div>
    </section>

    <!-- AI АССИСТЕНТ -->
    <section class="ai-section">
      <div class="ai-section__body">
        <div class="ai-section__text">
          <p class="ai-section__label">Знакомьтесь, это AI-ассистент (Имя)</p>
          <p class="ai-section__desc">
            Он поможет вам разобраться в документах, ответит на вопросы
            и подскажет нужный раздел
          </p>
          <a href="#" class="ai-section__btn">Болтать онлайн</a>
        </div>
        <div class="ai-section__ghost">
          <img src="/images/ghost_big.png" alt="assistant" width="180" />
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
const cards = [
  { title: 'Конституция Российской Федерации', link: 'allNPA/constitution/index'},
  { title: 'Федеральный закон РФ', link: 'allNPA/federal_law_RF/index', accent: true},
  { title: 'Уголовный кодекс РФ', link: 'allNPA/criminal_code_RF/index', dark: true},
  { title: 'Административный кодекс КоАП РФ', link: 'allNPA/administrative_code_RF/index', dark: true},
  { title: 'Гражданский кодекс РФ', link: 'allNPA/civil_code_RF/index', accent: false },
  { title: 'Постановления Правительства', link: 'allNPA/government_resolutions/index', accent: true },
  { title: 'Приказы', link: 'allNPA/orders/index', accent: true},
  { title: 'Указы Президента', link: 'allNPA/presidential_decrees/index', dark: true},
  { title: 'Международные стандарты и ГОСТы', link: 'allNPA/international_standards_GOST/index', accent: false },
  { title: 'Информационные письма', link: 'allNPA/information_letters/index', accent: false },
  { title: 'Методические рекомендации', link: 'allNPA/methodological_recommendations/index', accent: true},
  { title: 'Официальные разъяснения', link: 'allNPA/official_explanations/index', dark: true},
]
</script>

<style scoped>
.home-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
  font-family: 'Inter', sans-serif;
}

/* HERO */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0 60px;
  gap: 40px;
}

.hero__title {
  font-family: 'Unbounded', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #111111;
  line-height: 1.2;
  margin: 0 0 20px;
}

.hero__desc {
  font-size: 16px;
  color: #000000;
  line-height: 1.6;
  max-width: 480px;
  margin: 0;
}

.hero__ghost {
  flex-shrink: 0;
}

/* БАЗА ЗНАНИЙ */
.knowledge {
  padding: 20px 0 60px;
}

.knowledge__label {
  display: inline-block;
  background-color: #aaff00;
  color: #1a1a1a;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 28px;
  font-family: 'Inter', sans-serif;
}

.knowledge__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* КАРТОЧКИ */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #eeeeee;  /* ← светлый */
  border-radius: 16px;
  padding: 20px;
  min-height: 120px;
  text-decoration: none !important;
  transition: transform 0.2s ease, opacity 0.2s ease;
  border: none;
}

.card:hover {
  transform: translateY(-2px);
  opacity: 0.9;
  background-color: #b6b6b6;
}

.card--accent {
  background-color: #aaff00;
}

.card--accent .card__title {
  color: #1a1a1a;
}

.card--accent .card__btn {
  color: #1a1a1a;
}

.card--accent:hover {
  transform: translateY(-2px);
  opacity: 0.9;
  background-color: #99ee00;
}

.card--dark {
  background-color: #181818;
}

.card--dark .card__title {
  color: #ffffff;
}

.card--dark .card__btn {
  color: #ffffff;
}

.card--dark:hover {
  transform: translateY(-2px);
  opacity: 0.9;
  background-color: #000000;
}

.card__title {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  line-height: 1.4;
  margin-bottom: 16px;
}

.card__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #000000;
  font-weight: 500;
}

/* AI СЕКЦИЯ */
.ai-section {
  background-color: #f5f5f0;
  border-radius: 24px;
  padding: 48px;
  margin-top: 20px;
}

.ai-section__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.ai-section__label {
  font-size: 20px;
  color: #000000;
  margin: 0 0 12px;
  font-weight: 600;
}

.ai-section__desc {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 0 28px;
}

.ai-section__btn {
  display: inline-block;
  background-color: #aaff00;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 100px;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.ai-section__btn:hover {
  background-color: #99ee00;
  transform: translateY(-1px);
}

/* Адаптив */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: 40px 0 40px;
  }

  .hero__title {
    font-size: 32px;
  }

  .knowledge__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .ai-section {
    padding: 28px;
  }

  .ai-section__body {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .knowledge__grid {
    grid-template-columns: 1fr;
  }
}
</style>