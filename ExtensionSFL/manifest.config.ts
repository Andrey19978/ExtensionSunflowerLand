import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  permissions: [
    'sidePanel',
    'contentSettings',
    'storage',      // Добавляем
    'activeTab',    // Добавляем
    'scripting',    // Добавляем
    'tabs',         // Добавляем
    'notifications' // Добавляем
  ],
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: ['https://sunflower-land.com/play/*'],
  }],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  host_permissions: [
    'https://sunflower-land.com/play/*',  // Добавляем для конкретного сайта
  ]
})