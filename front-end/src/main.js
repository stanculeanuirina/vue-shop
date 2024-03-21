import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

/*
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA5yRH9WUY10oufJUhnlTeDMz1f77RM-mI",
    authDomain: "shop-vue-6e934.firebaseapp.com",
    projectId: "shop-vue-6e934",
    storageBucket: "shop-vue-6e934.appspot.com",
    messagingSenderId: "632687091725",
    appId: "1:632687091725:web:11e2a2eca890362fe17544"
  };

initializeApp(firebaseConfig);
*/
createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/cart',
    component: ShoppingCartPage,
  }, {
    path: '/products',
    component: ProductsPage,
  }, {
    path: '/products/:productId',
    component: ProductDetailPage,
  }, {
    path: '/',
    redirect: '/products',
  }, {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  }]
}))
.mount('#app')
