import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import {mdi} from "vuetify/lib/iconsets/mdi"
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'


export default createVuetify({
  components,
  directives,
  ssr:true,
  theme: {
    defaultTheme: 'light',
    themes: {
      light:{
        colors:{      
          primary: "#555353",
          secondary: '#020304',   
          accent: '#93C123',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
      },
      dark:{
        colors:{      
          primary: "#FFFFFF",
          secondary: '#555353',   
          accent: '#93C123',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
      }
    }
  },
  icons: { 
    defaultSet: 'fa',
    aliases,   
    sets: {
        mdi,
        fa      
    }
},
  
  
})