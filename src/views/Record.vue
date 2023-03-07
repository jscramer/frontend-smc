<template>
    <v-card class="mx-auto my-5"  color="secondary" :max-width="maxWidth"  elevation="20">
        <v-img     
        :src="this.verfspatUrl3"        
        aspect-ratio="5"        
        >     
        <v-card-title class="text-h3 my-2 uspcHeader">Record </v-card-title>
        <v-card-text>
            <v-row  v-if="!this.recordingStatus">
                <!-- Select your sport card-->
                <v-card elevation="5" class="mx-auto my-2" color="primary" width="100%">
                    <v-card-item>
                        <v-card-title>Choose your sport</v-card-title>
                    </v-card-item>
                    <v-card-text>
                        <v-btn variant="tonal" v-for="sport in sport" :key="sport.name" :value="sport.name"
                            @click="changeSport(sport.name)">{{ sport.name }}</v-btn>
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row v-if="(filteredSport != null) && !this.recordingStatus">
                <!-- Show placement info regarding the sport-->
                <v-card elevation="5" class="mx-auto my-2" color="primary" width="100%">
                    <v-card-item>
                        <v-card-title>Placement info for {{ filteredSport[0].name }}</v-card-title>
                    </v-card-item>
                    <v-card-text>                       
                        {{filteredSport[0].explanation }}
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row>
                <!-- Input tag placement-->
                <v-card elevation="5" color="primary" class="mx-auto my-2 text-center" width="100%">                                              
                        <v-card-title>Recording information</v-card-title>                           
                    <v-card-text v-if="this.recordingStatus">                         
                        <v-icon icon="fas fa-circle fa-fade fa-3x" color="red" />                                                                     
                    </v-card-text>
                    <v-card-text v-else>                      
                        <v-form ref="form" v-model="valid">                  
                        <v-text-field label="Tag ID" v-model="tagId" :rules="tagIdRules"></v-text-field>                    
                    </v-form>   
                    </v-card-text>
                </v-card>
            </v-row>                                          
            <v-row class="mt-2">                        
                    <v-btn class="mx-auto" color="error"  v-if="this.recordingStatus" @click="stopRecording()">
                        Stop
                    </v-btn>
                    <v-btn class="mx-auto" color="accent" v-else @click="startRecording()">
                        Start
                    </v-btn>  
            </v-row>  
        </v-card-text>
    </v-img>
    </v-card>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useAuthStore } from '../store/authStore'
import { useRecordingStore } from '../store/recordingStore'
import { useDisplay } from 'vuetify'
import axios from 'axios'
import verfspat3 from '../assets/images/paintsplatter/verfspat3.png'

export default {
    setup() {
        const recordingStore = useRecordingStore()
        const {setRecordingOnTrue, setRecordingOnFalse} = recordingStore
        const authStore = useAuthStore()       
        const verfspatUrl3 = verfspat3  
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
        return {
            setRecordingOnFalse,setRecordingOnTrue,
            authenticated: computed(() => authStore.authenticated),
            recordingStatus: computed(()=> recordingStore.status),    
            verfspatUrl3,maxWidth
        }
    },
    data: () => ({
        sdvBackendUrl:  import.meta.env.VITE_BACKEND_URL,
        sport: [
            { name: 'BMX', explanation: 'Place the tag provided by Area 51 on the top bar of your BMX. Make sure to turn the tag on by holding the button in the middle of the tag till a led starts blinking.' },
            { name: 'Skateboard', explanation: 'Skateboard info goes here' },
            { name: 'Scooter', explanation: 'Scooter info goes here' }
        ],
        filteredSport: null, 
        valid: false,
        tagId: '',
        tagIdRules: [ v => (v === '0' || !!v) || 'A tag ID is required'],     
    }),
    methods: {
        changeSport(value) { 
            this.filteredSport = this.sport.filter(sport => sport.name == value)  
        },
        async validateForm(){
            const { valid } = await this.$refs.form.validate()
        },
        startRecording() {         
            this.validateForm()
            if(this.valid){                                               
                try{          
                    axios.post(`${this.sdvBackendUrl}/record/start?sensor=${this.tagId}`, null, { withCredentials: true }) 
                    this.setRecordingOnTrue() 
                }
                catch(e){
                    console.log(e)
                }
                this.$refs.form.reset()
            }           
        },
        stopRecording() {               
            try{
                axios.post(this.sdvBackendUrl+"/record/stop",null,{ withCredentials: true })
                this.setRecordingOnFalse()               
            }
            catch(e){
                console.log(e)
            }
        }
    }
}
</script>
<style>

.uspcHeader{
    font-family: "The Unknown Regular";
    font-weight: bold;
    color: rgb(147, 193, 35);   
}

.uspcCardFrame{
    color: rgba(var(--v-theme-primary), 0.9);
}
</style>
