const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://anitikin.github.io/NetGhost_site/'
const DOCS_DIR = path.resolve(process.cwd(), 'docs')

function processFile(filePath, baseDir) {
  const raw = fs.readFileSync(filePath, 'utf-8')

  const relative = filePath.replace(baseDir, '').replace(/\\/g, '/')
  const url = SITE_URL + relative
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '.html')

  if (raw.includes('url:') || raw.includes('Источник:')) {
    console.log('  пропускаю (уже есть): ' + relative)
    return
  }

  if (raw.startsWith('---')) {
    const updated = raw.replace(/^---/, '---\nurl: ' + url)
    fs.writeFileSync(filePath, updated, 'utf-8')
  } else {
    const updated = '---\nurl: ' + url + '\n---\n\nИсточник: ' + url + '\n\n' + raw
    fs.writeFileSync(filePath, updated, 'utf-8')
  }

  console.log('  ✓ ' + url)
}

function walk(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (['.vitepress', 'node_modules'].includes(entry.name)) continue
      walk(full, baseDir)
    } else if (entry.name.endsWith('.md')) {
      processFile(full, baseDir)
    }
  }
}

console.log('Добавляю URL в файлы...')
walk(DOCS_DIR, DOCS_DIR)
console.log('Готово!')