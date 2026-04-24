export default {
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
      { text: "Changelog", 
      items: [
    { text: "v0.0.1", link: "/item-1" },
    { text: "v0.0.2", link: "/item-2" },
    { text: "v0.0.3", link: "/item-3" },
    ],
    },
  ],
    sidebar: {
      '/constitutiion':      // Sidebar для Конституции + НПА
        {
          text: 'Конституция РФ',
          collapsible: true,
          items: [
            { text: 'Главная', link: '/konstitutsiya/' },
            { text: 'Глава 1', link: '/konstitutsiya/glava-1' },
            { text: 'Глава 2', link: '/konstitutsiya/glava-2' },
            // Добавьте статьи: { text: 'Статья 1', link: '/konstitutsiya/statya-1' }
          ]
        },
      },    
   footer: {
      message: 'Выпущено под <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.', 
      copyright: 'Copyright © 2026 NetGhost'  
    } 

  },
};