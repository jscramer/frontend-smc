import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore',{
  state: () => ({  
    //authenticated: localStorage.getItem('smc-auth'),  
    //TODO: Remove this line below, only used for testing purposes
    authenticated: true  ,
  }), 
  actions:{    
    setAuthenticatedOnTrue(){
      this.authenticated =true 
      localStorage.setItem('smc-auth', true)             
    },
    setAuthenticatedOnFalse(){
      this.authenticated = false
      localStorage.clear('smc-auth')
    },
   
  },
})

