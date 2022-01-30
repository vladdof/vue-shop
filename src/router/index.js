import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/main-page.vue';
import ProductPage from '@/pages/product-page.vue';
import CartPage from '@/pages/cart-page.vue';
import NotFoundPage from '@/pages/not-found-page.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart',
  },
  {
    name: 'not-found',
    component: NotFoundPage,
    path: '*',
  },
];
const router = new VueRouter({
  routes,
});

export default router;
