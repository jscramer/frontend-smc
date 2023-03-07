<template>
  <v-bottom-navigation grow bg-color="primary">
    '<v-tooltip text="Videos" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" value="videos" @click="routerLinkTo('/videos')">
          <v-icon icon="fas fa-video" />
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Home" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" value="home" @click="routerLinkTo('/')">
      <v-icon icon="fas fa-home" />
    </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Record" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" value="record" @click="routerLinkTo('/record')">
      <v-icon icon="fas fa-record-vinyl" />
    </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Login" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" value="login" v-if="!this.authenticated" @click="routerLinkTo('/login')">
      <v-icon icon="fas fa-right-to-bracket" />
    </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Logout" location="top">
      <template v-slot:activator="{ props }">
         <v-btn v-bind="props" value="logout" v-if="this.authenticated" @click="logOut()">
      <v-icon icon="fas fa-right-from-bracket" />
    </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Toggle theme" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" value="theme" @click="toggleTheme()">
      <v-icon icon="fas fa-circle-half-stroke" />
    </v-btn>
      </template>
    </v-tooltip>
  </v-bottom-navigation>
  </template>

<script>
import { useAuthStore } from '../store/authStore'
import { computed } from "@vue/reactivity";
import { useTheme } from 'vuetify'

export default {
  setup() {
    const authStore = useAuthStore()
    const { setAuthenticatedOnFalse } = authStore
    const theme = useTheme()
    return {
      setAuthenticatedOnFalse,
      authenticated: computed(() => authStore.authenticated),
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark',
    }
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    routerLinkTo(value) {
      this.$router.push(value)
    },
    logOut() {
      this.setAuthenticatedOnFalse()
      this.logOutSDV()
      this.routerLinkTo('/login')
    },
    logOutSDV(){
      try {
        axios.post()
          .then((response) => {
            this.mockRuns.push(response.data) 
            for(var i =0; i<response.data.length; i++){                                      
              this.processDay(response.data[i])
            }                    
            this.setDatesWithData(this.daysWithData)
          })
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>