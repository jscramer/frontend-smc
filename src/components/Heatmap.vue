<template>
  <div>
    <v-card class="mx-auto" :max-width="maxWidth">
      <v-card-title>Heatmap</v-card-title>
      <v-card-subtitle>{{ currentZone }}</v-card-subtitle>
      <v-card-actions>
        <v-row>
          <v-btn v-for="zone in zones" @click="filterZone(zone)">
            {{ zone.name }}
          </v-btn>
        </v-row>        
      </v-card-actions>
      <v-card-text>    
        <apexchart ref="heatmap" width="80%" height="1200" type="heatmap" :options="chartOptions" :series="series"></apexchart>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import jsonData from '../components/heatmapdata.json'
import { useDisplay } from 'vuetify'
import { computed } from "@vue/reactivity"

export default {
  setup(){
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
  },
  data: function () {
    return {
      currentZone: 'Full Park',
      zones:[
        {name: 'Full Park', xBegin: 0, xEnd:39700, yBegin: 0, yEnd: 92770},
        {name: 'Test Park', xBegin: 0, xEnd:8000, yBegin: 0, yEnd: 21000},
        {name: 'Bowl 1', xBegin: 0, xEnd:22230, yBegin: 0, yEnd: 23140},
        {name: 'Practice Area', xBegin: 0, xEnd:10, yBegin: 23140, yEnd: 49110},
        {name: 'BMX Park', xBegin: 0, xEnd:10, yBegin: 49110, yEnd: 92770},
        {name: 'Street Area', xBegin: 0, xEnd:10, yBegin: 0, yEnd: 92770},
      ],
      xLabels: [],
      yLabels: [],
      chartOptions: {
        chart: {
          id: "vuechart-example",
          animations: {
            enabled: false,
          },      
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          heatmap: {
            enableShades: true,
            shadeIntensity: 0.6,
            reverseNegativeShade: true,            
            radius: 0,
            useFillColorAsStroke: true,
            colorScale: {
              ranges: [{
                from: 0,
                to: 0,
                name: '0',
                color: '#00A100'
              },
              {
                from: 1,
                to: 5,
                name: '1-5',
                color: '#128FD9'
              },
              {
                from: 5,
                to: 10,
                name: '5-10',
                color: '#FFB200'
              },
              {
                from: 10,
                to: 100,
                name: '10-100',
                color: '#FF0000'
              }
              ]
            }
          }
        },
        xaxis: {
          categories: [],          
          labels: {
            rotateAlways: true,
            rotate: -45,
            minHeight: 60,           
          }
        },
        yaxis: {
  labels: {
    formatter: function (value) {      
      return value
    }
  },
},
      },
      series: [
      ],
    };
  },
  beforeMount() {
    this.generateHeatmap();
  },
  methods: {
    filterZone(zone){
      //Update the current zone name to inform users what zone is shown
      this.currentZone = zone.name
      var filteredXLabels = []
      var filteredYSeries = []      
      
      filteredYSeries = this.yLabels.filter(element => element.name >= zone.yBegin && element.name <= Math.round(zone.yEnd/1000)*1000)
      filteredXLabels = this.xLabels.filter(element => element >= zone.xBegin && element <= Math.round(zone.xEnd/1000)*1000)

      //Change the y-values with the filtered ones
      this.series = filteredYSeries    
      this.chartOptions.xaxis.categories = filteredXLabels

      //Change the x-axis values
      this.$refs.heatmap.updateOptions({
        xaxis: {
          categories: filteredXLabels,
          min: filteredXLabels[0],
          max: filteredXLabels[filteredXLabels.length - 1],      
        }
      })  
    },
    generateHeatmap() {
      //Generating heatmap based on the jsonData coming in
      var seriesToAdd = {
        name: 0,
        data: []
      }
      var xValue = -1;
      jsonData.forEach(element => {
        //Adding X-Axis
        if (element.x > xValue) {
          this.xLabels.push(element.x)
          this.chartOptions.xaxis.categories.push(element.x)
          xValue = element.x
        }

        //Creating new series and adding counter values to it
        if (element.y != seriesToAdd.name) {
          this.series.push(seriesToAdd)
          this.yLabels.push(seriesToAdd)
          seriesToAdd = new Object({ name: 0, data: [] })          
          var realValue = parseInt(element.y) / 1000
          seriesToAdd.name = element.y
          seriesToAdd.data.splice(0)
        }
        seriesToAdd.data.push(element.counter)
      });     
    }
  }
};
</script>