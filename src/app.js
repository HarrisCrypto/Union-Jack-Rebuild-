import { initHero } from './hero.js'
import { initMotion } from './motion.js'
import { initNav } from './site.js'
import './compare.js'

function boot() {
  initMotion()
  initNav()
  initHero()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
