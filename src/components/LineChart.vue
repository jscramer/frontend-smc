<template>
    <v-card class="mx-auto" :max-width="maxWidth">
        <v-card-title class="text-center">
            <h1>{{ this.chartName }}</h1>
        </v-card-title>
        <v-card-subtitle class="text-center">From {{ this.chartLabels[0] }} to {{
            this.chartLabels[this.chartLabels.length
                - 1]
        }}</v-card-subtitle>
        <v-card-text class="text-center">
            <v-progress-circular indeterminate :size="80" v-if="!ready"></v-progress-circular>
            <Line :chart-data="chartData" v-if="ready"/>            
        </v-card-text>
    </v-card>
</template>  
<script>
import { useDisplay } from 'vuetify'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'
import { computed } from "@vue/reactivity"
import { useChartStore } from '../store/chartStore'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
    name: 'LineChart',
    components: { Line },
    computed: {
        chartData() {
            return {
                labels: this.chartLabels,
                datasets: [{
                    label: this.chartName + " per day",
                    data: this.dataForChart,
                    backgroundColor: 'rgba(80, 200, 120, 0.5)',
                    borderColor:'rgba(80, 200, 120, 0.5)',
                },
                {
                    label: "Average speed",
                    data: this.averageDataForChart,
                    backgroundColor: 'rgba(248, 121, 121, 0.5)',
                    borderColor:'rgba(248, 121, 121, 0.5)',
                }]
            }
        },
        chartOptions() { return { responsive: true } }
    },
    setup() {       
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
      const chartStore = useChartStore()
        return {
            datespan: computed(() => chartStore.datespan),
            chartName: computed(() => chartStore.name),
            data: computed(() => chartStore.data),
            datesWithData: computed(()=> chartStore.datesWithData)
        };
    },
    beforeMount() {
        this.createDayLabels()
        this.fillData()        
    },
    data: () => ({
        ready: false,
        chartLabels: [],
        dataForChart: [],
        averageDataForChart: [],
        dataFromResponse:[]
    }),
    methods: {
        createDayLabels() {
            var startDate = new Date(this.datespan[0]);
            var endDate = new Date(this.datespan[1]);
            var d = new Date(startDate)

            while (d <= endDate) {
                this.chartLabels.push(d.toISOString().split('T')[0])
                d.setDate(d.getDate() + 1)
            }
        },
        fillData() {
            var dataReceived
            axios.post('https://73ae3490-6203-4d41-bbae-0bc5a03cca25.mock.pstmn.io/speed/average-speed-multiple', this.data)
                .then((response) => {                    
                    dataReceived = response.data                   
                }).finally(()=>{  
                    this.dataForChart.push(dataReceived[0])   
                    this.dataForChart.push(dataReceived[1]) 
                    this.dataFromResponse.push(dataReceived[0])   
                    this.dataFromResponse.push(dataReceived[1]) 
                                                
                //   var counter = 1                  
                //   while(counter <= this.chartLabels.length){
                //     this.chartLabels.forEach(value=>{    
                //         if(this.datesWithData.find(day => day == value)){
                //             console.log("Day found")
                //             counter ++
                //         }
                        
                //         if(value == this.datesWithData[0][counter]){                                                        
                //             this.dataForChart.push(dataReceived[counter])
                //             this.dataFromResponse.push(dataReceived[counter])
                //             counter++
                //         }
                //         else{
                //             this.dataForChart.push(0)
                //         } 
                //     })
                //   }          
                    this.calculateAverage()
                })
        },
        calculateAverage(){
            console.log(this.dataFromResponse)
            var total = 0
            for(var i = 0; i < this.dataFromResponse.length ; i++){
                total += this.dataFromResponse[i]
            }            
            var average = total / this.dataFromResponse.length            
            this.chartLabels.forEach(value=>{
                this.averageDataForChart.push(average)
            })
            //Set ready on true, so that the graph can be drawn
            this.ready = true
        }
    }
}
</script>