import { createApp } from 'vue'
import {router} from './routes'
import { useListStore } from "../src/stores/listStore";
import { createPinia } from 'pinia'
import { setAuthHeader } from "./setAuthHeader.js"
import 'bootstrap/dist/css/bootstrap.css';


import './style.css'
import App from './App.vue'



const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

const ListData = useListStore();
//Navigation guard
router.beforeEach((to, _from, next) => {
    if (to.meta.auth && !ListData.isAuthenticated) {
        next('/')
    } else if (!to.meta.auth && ListData.isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

if (ListData.isAuthenticated) {
    setAuthHeader(localStorage.token);
} else {
    setAuthHeader();
}
