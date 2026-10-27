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
      // Couleurs de validator-api-client (012, R3) aux contrastes WCAG AA : #1a5fb4 (6,3:1) pour
      // les liens et boutons, #3f4a55 (9:1) pour le texte secondaire ; #3993f3 et #788089, trop
      // clairs pour du texte, ne servent qu'au décor. Opacité « medium-emphasis » relevée (0,6 par
      // défaut) pour un contraste ≥ 4,5:1.
      light: {
        dark: false,
        colors: {
          primary: '#1a5fb4', secondary: '#3f4a55', accent: '#3993f3', optional: '#ffca00',
          background: '#ffffff', surface: '#ffffff', 'surface-light': '#f4f6f8', divider: '#b8c0ca',
          'on-background': '#091625', 'on-surface': '#091625',
        },
        // Contrastes renforcés : texte principal plein, texte secondaire et bordures plus foncés.
        variables: { 'high-emphasis-opacity': 1, 'medium-emphasis-opacity': 0.88, 'border-color': '#091625', 'border-opacity': 0.28, 'disabled-opacity': 0.55 },
      },
      dark: {
        dark: true,
        colors: { primary: '#8ab4e0', secondary: '#a3b4c6', accent: '#3993f3', optional: '#ffca00', 'surface-light': '#1b222b', divider: '#3f4a55' },
        variables: { 'high-emphasis-opacity': 1, 'medium-emphasis-opacity': 0.9, 'border-opacity': 0.32, 'disabled-opacity': 0.6 },
      },
    },
  },
})
