import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";


//Importing views for router
import Dashboard from '../views/Dashboard.vue'
import Videos from '../views/Videos.vue'
import Record from '../views/Record.vue'
import Run from '../views/Run.vue'
import Login from '../views/Login.vue'
import Chartpage from '../views/Chartpage.vue'

import { useChartStore } from "../store/chartStore";
import { useErrorStore } from "../store/errorStore";
import axios from 'axios';

//Env data
const sdvBackend =  import.meta.env.VITE_BACKEND_URL;

//List of all available routes
const availableRoutes = [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/videos', name: 'videos', component: Videos },
    { path: '/record', name: 'record', component: Record },
    { path: '/run/:id', component: Run },
    { path: '/login', name: 'login', component: Login },
    { path: '/chart', name: 'chartpage', component: Chartpage},]

//Creating the Router
const router = createRouter({
    
    history: createWebHistory(),
    routes: availableRoutes
  })

function checkToken(){
    const authStore = useAuthStore()

    axios.get(sdvBackend+'/check', { withCredentials: true })
        .then((response) => {
            if(response.status == 204){
                authStore.setAuthenticatedOnTrue()
            } else {
                authStore.setAuthenticatedOnFalse()
            }
        })
        .catch(err => {             
            //If an error occured retrieving the user state, log the user off
            authStore.setAuthenticatedOnFalse()
        })
}


//Adding security measurement to check if user are authenticated
router.beforeEach(async(to,from)=>{
    const authStore = useAuthStore()
    const errorStore = useErrorStore()
    const chartStore = useChartStore()

    //Call SDV Backend authorization to check if token is still valid
    //Can just add a random code since the authorization process will pick up the sessionToken and 
    //therefore will know if an user is authenticated
    //checkToken()
    
    if(to.name == 'login'){
        errorStore.closeSnackbar()
    }

    if(to.name =='chartpage'){        
        if(chartStore.datespan < 1){
            errorStore.setErrorMessage("No dates are selected")
            return {name: 'dashboard'}
        }        
    }

    if(!authStore.authenticated && to.name !== 'login'){ 
        errorStore.setErrorMessage("You need to be logged in to see this page")
        return {name: 'login'}
    }    

   })

   

export default router;