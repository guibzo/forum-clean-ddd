import simpleImportSort from 'eslint-plugin-simple-import-sort'
import customEslint from '@rocketseat/eslint-config/node.js'

export default [
  {
    customEslint,
    files: ['*.ts'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
  },
]
