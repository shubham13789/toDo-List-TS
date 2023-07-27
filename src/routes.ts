import { Router, createRouter, createWebHistory } from 'vue-router'
import DashBoard from "./components/DashBoard.vue";
import LoginPage from "./components/LoginPage.vue";
import RegistrationPage from "./components/RegistrationPage.vue";
import ConfirmRegistration from "./components/ConfirmRegistration.vue";

export const router:Router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard,
        meta: { auth: true }
    },
    {
        path: "/",
        name: "Login",
        component: LoginPage,
        meta: { auth: false }
    }, {
        path: "/register",
        name: "Registration",
        component: RegistrationPage,
        meta: { auth: false }
    }, {
        path: "/confirmed",
        name: "ConfirmRegistration",
        component: ConfirmRegistration,
        meta: { auth: false }
    }]
});