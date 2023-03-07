<template>
  <v-app id="uspc"> 
    <v-snackbar
      v-model="snackbar"
      location="top"
    >
      {{ error }}
      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="closeSnackbar()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>     
    <v-main>     
         <!-- Main page content based on router view-->
         <router-view></router-view>
    </v-main>
    <BottomNavigation></BottomNavigation> 
  </v-app>
</template>

<script>
import { computed } from '@vue/reactivity';
import BottomNavigation from './components/BottomNavigation.vue'
import { useErrorStore } from "./store/errorStore.js";

export default {
  setup(){   
    const errorStore = useErrorStore()
    const { closeSnackbar } = errorStore
    return{
      closeSnackbar,
      snackbar: computed(() => errorStore.snackbar),
      error: computed(() => errorStore.error)
    }
  },
  name: 'App',
  components: {   
  }, 
  methods:{
    routerLinkTo(value){
      this.$router.push(value)
    },   
  },
 
}
</script>

<style>
#uspc{
  background-image: url('assets/images/uspc.png');
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
