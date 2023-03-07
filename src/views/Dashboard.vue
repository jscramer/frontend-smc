<template>
  <v-card class="mx-auto my-5" :max-width="maxWidth" color="secondary" elevation="10">
    <v-img
      :src="this.verfspatUrl1"        
      aspect-ratio="5"      
    >  
    <v-card-title class="text-h3 text-md-h3 text-sm-h2 text-xs-h2 my-2 uspcHeader">Dashboard</v-card-title>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card color="primary">            
            <v-card-title class="text-h6 text-md-h5 text-sm-h5 text-xs-h6"><v-icon v-bind:icon="card.icon" start/>  {{card.title}}</v-card-title> 
            <v-divider></v-divider>  
            <v-card-text v-if="card.value == ''" @click="routerLinkToVisualisation(card)">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-card-text>
            <v-card-text v-else v-text="card.value" @click="routerLinkToVisualisation(card)">
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Seperate row for the last runs-->
      <v-row dense>
        <v-col>
          <v-card color="primary" class="mx-auto" elevation="10">
            <v-card-title  class="text-h6 text-md-h5 text-sm-h5 text-xs-h6"><v-icon icon="fas fa-calendar-days" start></v-icon>  Date picker</v-card-title>  
            <v-divider></v-divider>          
            <Datepicker class="mx-5 my-2" v-model="dates" range inline autoApply :highlight="this.daysWithData"
              @update:model-value="modelUpdate()" utc="true"></Datepicker>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card color="primary" class="mx-auto"  elevation="10">          
            <v-card-title  class="text-h6 text-md-h5 text-sm-h5 text-xs-h6"><v-icon icon="fas fa-person-running" start></v-icon>  Last runs</v-card-title>  
            <v-divider></v-divider>
            <v-card-text>             
              <v-list lines="one">
                <v-list-item
                  v-for="(run,i) in runs"
                  :key = "i"              
                >                  
                    {{ run }}                  
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
  </v-card>
</template>

<script>
import axios from 'axios'
import { useChartStore } from '../store/chartStore'
import { useAuthStore } from '../store/authStore'
import { computed } from "@vue/reactivity"
import { useDisplay } from 'vuetify'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import verfspat1 from '../assets/images/paintsplatter/verfspat1.png'


export default {
  components: { Datepicker },
  setup() {
    const { name } = useDisplay()
    const chartStore = useChartStore()
    const authStore = useAuthStore()    
    const { setNewCurrentDate, setNewDateSpan, setChartName, setChartType, setData, clearData, setDatesWithData } = chartStore
    const verfspatUrl1 = verfspat1  
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
      setNewCurrentDate, setNewDateSpan, setChartName, setChartType, setData, clearData, setDatesWithData, 
      datespan: computed(() => chartStore.datespan),
      chartName: computed(() => chartStore.name),
      datesWithData:computed(()=> chartStore.datesWithData),
      authenticated: computed(()=>authStore.authenticated),
      verfspatUrl1, maxWidth
    };
  },
  beforeMount() {    
    this.getLastRuns()    
    this.setNewCurrentDate()    
    this.getAverageSpeed()  
    this.getMaxSpeed()
    this.getDistance()
    this.getHeatMap()
  },
  data: () => ({
    sdvBackendUrl:  import.meta.env.VITE_BACKEND_URL,
    calculatorServiceUrl: import.meta.env.VITE_CALCULATOR_URL,
    dates: null,
    daysWithData: [],
    cards: [
      { title: 'Average Speed', value: '', flex: 12, visualisation: 'line', icon:'fas fa-gauge' },
      { title: 'Distance covered', value: '', flex: 12, visualisation: 'bar' , icon:'fas fa-route'},
      { title: 'Max Speed', value: '', flex: 12, visualisation: 'line', icon:'fas fa-gauge-simple-high'},
      { title: 'Heatmap', value: '', flex: 12, visualisation: 'heatmap' , icon:'fas fa-fire'},       
    ],
    runs:[], 
    runData:[],        
  }),
  methods: {
    getRuns(){
      try {
        axios.get(this.sdvBackendUrl+"/splits",  { withCredentials: true })
          .then((response) => {
            console.log(response)
          })
      }
      catch (error) {
        console.log(error)
      }
    },    
    modelUpdate(){
      this.setNewDateSpan(this.dates)       
      this.clearData() 
      this.setChartData() 
    },
    routerLinkToVisualisation(card) {
      if(card.visualisation == 'none'){
        return
      }   
      this.setChartName(card.title) 
      this.setChartType(card.visualisation)     
      this.$router.push({ name: 'chartpage' })    
    },
    routerLinkToRun(value) {
      this.$router.push('/run/' + value)
    },    
    processRun(value){
      this.runData.push(value)
      var time = value["measurements"][0]["t"]
      var timeString = time.substring(0,time.indexOf("T"))
      this.daysWithData.push(timeString)   
      var zone =value["zone"]["name"]
      var run = zone + " - " + timeString
      this.runs.push(run)
    },
    setChartData(){
      //For now just picks the mock data, needs to check based on date
      this.setData(this.runData)      
    },
    getLastRuns(){      
      try {
        axios.get(this.sdvBackendUrl+"/runs", {withCredentials:true})
          .then((response) => {            
            for(var i =0; i<response.data.length; i++){    
              this.processRun(response.data[i])              
            }                    
            this.setDatesWithData(this.daysWithData)            
          })
      }
      catch (error) {
        console.log(error)
      }
    },
    getAverageSpeed() {
      if(this.runData.length != 0)
      {
        axios.post(this.calculatorServiceUrl+"/speed/average-speed",this.runData[0], {withCredentials: true})
        .then((response) => {
          this.cards[0].value = response.data + ' km/h'
        })
      }
      else{
        this.cards[0].value = "No last run has been recorded"
      }        
    },
    getDistance() {
      if(this.runData.length != 0)
      {
        axios.post(this.calculatorServiceUrl+"/distance/calculate",this.runData[0], {withCredentials: true})
        .then((response) => {
          this.cards[1].value = response.data + ' m'
        })
      }
      else{
        this.cards[1].value = "No last run has been recorded"
      } 
    },  
    getMaxSpeed() {
      if(this.runData.length != 0)
      {
        axios.post(this.calculatorServiceUrl+"/speed/max-speed",this.runData[0], {withCredentials: true})
        .then((response) => {
          this.cards[2].value = response.data + ' km/h'
        })
      }
      else{
        this.cards[2].value = "No last run has been recorded"
      }     
    },
    getHeatMap() {
      if(this.runData.length != 0){
        axios.post(this.calculatorServiceUrl+"/heatmap/single-split",this.runData[0], {withCredentials:true})
        .then((response) => {
          var highestCounter = 0
          var xValue = 0
          var yValue = 0
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i]['counter'] > highestCounter) {
              highestCounter = response.data[i]['counter']
              xValue = response.data[i]['x']
              yValue = response.data[i]['y']
            }
          }
          this.cards[3].value = 'Most ridden around coordinate x:' + xValue + ", y: " + yValue + ". Amount of times: " + highestCounter
        })
      }
      else{
        this.cards[3].value = "No last run has been recorded"
      }     
    },
  },  
}
</script>
<style>
.uspcHeader{
    font-family: "The Unknown Regular";
    font-weight: bold;
    color: rgb(147, 193, 35);   
}
</style>