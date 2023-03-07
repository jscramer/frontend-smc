import { defineStore } from 'pinia'

export const useErrorStore = defineStore('errorStore',{
  state: () => ({  
    snackbar: false, 
    error: ''   
  }), 
  actions:{
    setErrorMessage(message){
      this.error = message
      this.snackbar = true
    },
    closeSnackbar(){
      this.snackbar = false
    }
  }
})

