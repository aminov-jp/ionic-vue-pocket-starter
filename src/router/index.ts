import { createRouter, createWebHistory } from '@ionic/vue-router';
import {  RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AuthPage from '../views/AuthPage.vue';
import {authService} from '@/composables/auth.service';
const state = authService();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },

  {
    path: '/auth/',
    component : AuthPage,
    children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginPage.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../views/SignupPage.vue')
        },
        {
          path: 'verification/:tok',
          name: 'verification',
          component: () => import('../views/verificationPage.vue')
        },
        {
          path: 'change/:tok',
          name: 'change',
          component: () => import('../views/ChangePassPage.vue')
        },
        {
          path: 'reset',
          name: 'reset',
          component: () => import('../views/ResetPage.vue')
        }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const goHome = (valid:boolean,page:any) =>{
  if(valid && (page === 'login' || page=== 'signup' || page === 'verification' || page =='reset')){
    console.log("Go Home")
    return true;
  }
  console.log("NO Home")
  return false;
}

router.beforeEach((to,from,next) =>{
  if(state.valid.value === false){
    state.authCheck().then(()=>{
      if(goHome(state.valid.value ,to.name )) {next({name:'home', replace:true})}else {
        next();
      }
    })
  }else{
    if(goHome(state.valid.value ,to.name  )) {next({name:'home', replace:true})}else{
      next();
    }
  }
})

export default router
