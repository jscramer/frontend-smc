import { defineStore } from 'pinia'

export const useChartStore = defineStore('chartStore',{
  state: () => ({  
    name: '',  
    currentDate: null,   
    datespan: [],  
    type: '',
    data:[],
    datesWithData:[]
  }),
  actions:{      
    setDatesWithData(value){    
      this.datesWithData.splice(0)  
      this.datesWithData.push(value)     
    },
    setChartName(value){
      this.name = value
    },
    clearData(){
      this.data.splice(0)
    },
    setData(value){
      this.data.push(value)
    },
    setNewDateSpan(datespan){
      this.datespan = datespan
    },
    setNewCurrentDate(){     
      this.currentDate = new Date() 
    },
    setChartType(value){
      this.type = value
    }
  },
})

