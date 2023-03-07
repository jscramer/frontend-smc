import { defineStore } from 'pinia'

export const useDateStore = defineStore('dateStore',{
  state: () => ({  
    currentDate: null,    
    datespan: [],  
  }),  
  actions:{   
    setNewDateSpan(datespan){
      this.datespan = datespan
    },
    setNewCurrentDate(){     
      this.currentDate = new Date() 
    }
  },
})

