import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { fr } from 'vuetify/locale'

// Icônes SVG (@mdi/js) et styles embarqués : aucune police ni ressource distante (principe V).
export const vuetify = createVuetify({
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  locale: { locale: 'fr', messages: { fr } },
  theme: {
    defaultTheme: 'system',
    themes: {
      // Opacité « medium-emphasis » relevée (0,6 par défaut) pour un contraste ≥ 4,5:1 (WCAG AA).
      light: { dark: false, colors: { primary: '#1f4e79', secondary: '#5c6f82' }, variables: { 'medium-emphasis-opacity': 0.75 } },
      dark: { dark: true, colors: { primary: '#8ab4e0', secondary: '#a3b4c6' }, variables: { 'medium-emphasis-opacity': 0.8 } },
    },
  },
})
