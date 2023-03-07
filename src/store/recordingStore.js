import { defineStore } from 'pinia'

export const useRecordingStore = defineStore('recordingStore',{
  state: () => ({  
    status: localStorage.getItem('smc-recording'),    
  }),  
  actions:{   
    setRecordingOnTrue(){    
      this.status = true;
      localStorage.setItem('smc-recording', true)             
    },
    setRecordingOnFalse(){   
        this.status = false; 
      localStorage.clear('smc-recording')
    },
  }, 
})


