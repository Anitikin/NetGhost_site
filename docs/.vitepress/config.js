export default {
  base: '/NetGhost_site/',
  title: "NetGhost",
  description: "An awesome docs template built by me",
  themeConfig: {
    logo: "/ghost.png",
    siteTitle: "NetGhost",
    nav: [
      { text: "О нас", link: "/about" },
      { text: "Contact", link: "/contact" },
      { text: "Guide", link: "/guide" },
      { text: "Configs", link: "/configs" },
  ],
    
     sidebar: {
      '/allNPA/': [
        {
          items: [
            { text: 'Конституция РФ', link: 'allNPA/constitution/index' },
            { text: 'Федеральный закон РФ', link: 'allNPA/federal_law_RF/index' },
            { text: 'Уголовный кодекс РФ', link: 'allNPA/criminal_code_RF/index' },
            { text: 'Административный кодекс КоАП РФ', link: 'allNPA/administrative_code_RF/index' },
            { text: 'Гражданский кодекс РФ', link: 'allNPA/civil_code_RF/index' },
            { text: 'Постановления Правительства', link: 'allNPA/government_resolutions/index' },
            { text: 'Приказы', link: 'allNPA/orders/index' },
            { text: 'Указы Президента', link: 'allNPA/presidential_decrees/index' },
            { text: 'Международные стандарты и ГОСТы', link: 'allNPA/international_standards_GOST/index' },
            { text: 'Информационные письма', link: 'allNPA/information_letters/index' },
            { text: 'Методические рекомендации', link: 'allNPA/methodological_recommendations/index' },
            { text: 'фициальные разъяснения', link: 'allNPA/official_explanations/index' },
          ],
        },
      ],
  },
   footer: {
      message: 'Выпущено под <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.', 
      copyright: 'Copyright © 2026 NetGhost'  
    } 

  },
};