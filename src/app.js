import { initHero } from './hero.js'
import { initMotion } from './motion.js'
import './compare.js'
import './site.js'

function boot() {
  initMotion()
  initHero()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
