<template>   
    <BarChart v-if="this.chartType == 'bar'"></BarChart>
    <LineChart v-if="this.chartType == 'line'"></LineChart>
    <Heatmap v-if="this.chartType == 'heatmap'"></Heatmap>
</template>
  
<script>
import LineChart from "../components/LineChart.vue"
import BarChart from "../components/BarChart.vue"
import Heatmap from "../components/Heatmap.vue"
import { useChartStore } from "../store/chartStore"
import { computed } from "@vue/reactivity"


export default {
    name: 'Chart Page',  
    components: { LineChart, BarChart, Heatmap},
    setup() {
    const chartStore = useChartStore()   
    const { setNewCurrentDate } = chartStore
        return {
            setNewCurrentDate,
            datespan: computed(() => chartStore.datespan) ,
            chartType: computed(()=> chartStore.type),                 
        };
    },   
}
</script>