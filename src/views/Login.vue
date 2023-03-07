<template>
    <v-card width="100%" color="secondary" class="my-5">
      <v-card-title class="text-center">
        <h1>Login</h1>
      </v-card-title>
      <v-divider inset></v-divider>
      <v-card-text class="my-5">
        <v-row class="text-center">
          <v-col>
            <p>
              Welcome to the login page. This application makes use of the Sport Data Valley (SDV) platform to store
              all
              the
              recorded data.
              In order to use this application you need to have an active account on SDV. Please create one if you
              don't
              have one yet.
            </p>
            <br />
            <p>
              Create your Sport Data Valley account <a href="https://app.sportdatavalley.nl/" target="_blank">here</a>.
            </p>
          </v-col>
        </v-row>
        <v-row class="text-center mt-10">
          <v-col>
            <v-btn width="30%" height="100%" style="background-color: #39ACDD;" @click="login">
              <div>
                <b>Login</b>
                <span>
                  <v-img :aspect-ratio="1" src="https://sportdatavalley.app/images/sdv.png"></v-img>
                </span>
              </div>
            </v-btn>         
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import axios from 'axios';
import { computed } from "@vue/reactivity";
import { useDisplay } from 'vuetify'


export default {
  setup() {
    const authStore = useAuthStore()
    const { setAuthenticatedOnTrue } = authStore
    const { name } = useDisplay()
    const maxWidth = computed(() => {
        switch (name.value) {
          case 'xs': return '100%'
          case 'sm': return '100%'
          case 'md': return '60%'
          case 'lg': return '60%'
          case 'xl': return '60%'
          case 'xxl': return '60%'
        }
      })
    return {
      setAuthenticatedOnTrue,
      authenticated: computed(() => authStore.authenticated),
      maxWidth
    }
  },
  data: () => ({
    authorizeUrl: import.meta.env.VITE_AUTHORIZE_URL,
    sdvBackend: import.meta.env.VITE_BACKEND_URL,
    postmanAuthUrl: import.meta.env.VITE_POSTMAN_AUTH_URL,
    mode: import.meta.env.VITE_MODE
  }),
  methods: {  
    login() {
      if (this.mode == "PRODUCTION") {       
        window.location.assign(this.authorizeUrl)
      }
      else {
        //Get Postman Code
        axios.get(this.postmanAuthUrl)
          .then((response) => {
            //Get an access token with the code 
            console.log(response.data)
            this.getToken(response.data.code)
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    getToken(codeValue) {
      const body = {
        "code": codeValue
      }
      axios.post(this.sdvBackend + '/authorize', body, { withCredentials: true })
        .then((response) => {
          this.setAuthenticatedOnTrue()
          console.log("Authenticated user")

          //Push to dashboard
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>