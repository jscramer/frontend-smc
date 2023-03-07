<template>
    <v-card class="mx-auto my-5" max-width="60%" color="secondary" elevation="10">
      <v-img
        :src="this.verfspatUrl1"        
        aspect-ratio="5"      
      >  
      <v-card-title class="text-h3 my-2 uspcHeader">Videos</v-card-title>
      <v-card-text>
        To be implemented
      </v-card-text>    
     </v-img>
    </v-card>
  </template>
  
  <script>
  import verfspat4 from '../assets/images/paintsplatter/verfspat4.png'
  
  export default {    
    setup() { 
      const verfspatUrl4= verfspat4  
      return {
        verfspatUrl4
      };
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