module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['eslint --fix'],
  '*.vue': ['eslint --fix'],
  '*.{scss,less,styl,html}': ['prettier --write'],
  '*.md': ['prettier --write']
}
