import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddProductA from '../views/AddProductA.vue'
import ViewPc from '../views/ViewPc.vue'
import UpdateProduct from '../views/UpdateProduct.vue'

import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/AddProductA',
      name: 'AddProductA',
      component: AddProductA
    },
    {
      path: '/viewPc',
      name: 'viewPc',
      component: ViewPc,
      props: (route) => ({ id: route.query.id })
    },
    {
      path: '/updateProduct',
      name: 'updateProduct',
      component: UpdateProduct,
      props: (route) => ({ id: route.query.id })
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
