<template>    
    <v-card
      class="mx-auto"
      max-width="40%"
      color="grey"
      elevation="10"
    >      
    <v-card-title class="text-h3 font-weight-bold">More info of run {{$route.params.id}}</v-card-title>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <v-card-title class="text-white" v-text="card.title"></v-card-title>
              </v-img>  
            </v-card>
          </v-col>
        </v-row>     
        
      </v-container>
    </v-card>
  </template>


<script>
  export default {
    data: () => ({        
      cards: [
        { title: 'Impacts', src: '', flex: 12 },
        { title: 'Speed Data', src: '', flex: 6 },
        { title: 'Rotation Data', src: '', flex: 6 },
        { title: 'Airtime Data', src: '', flex: 12 },
        { title: 'Jump distance Data', src: '', flex: 12 },         
      ],
   
    runs: [
        [
            'Run 1'
        ],
        [
            'Run 2'
        ],
        [
            'Run 3'
        ],
    ]
    }),
    methods:{
    
    },
  }
</script>