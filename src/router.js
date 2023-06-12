import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'

import Homepage from './pages/Homepage.vue'
import Login from './pages/Login.vue'
import GithubCallback from './pages/GithubCallback.vue'
import CreateDeployment from './pages/CreateDeployment.vue'
import ListDeployments from './pages/ListDeployments.vue'
import ViewDeployment from './pages/ViewDeployment.vue'
import FourOhFour from './pages/404.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Homepage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/github/callback', component: GithubCallback, meta: { requiresAuth: false }
    }
    ,
    {
      path: '/deploy', component: CreateDeployment, meta: { requiresAuth: true }
    },
    {
      path: '/deployments', component: ListDeployments, meta: { requiresAuth: true }
    },
    {
      path: '/deployment/:id', component: ViewDeployment, meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*', component: FourOhFour, meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (store.getters.isUserLoggedIn) {
    return next();
  }
  else {
    if (to.meta.requiresAuth) {
      return next({ path: '/login' });
    }
    return next();
  }
});

export default router;