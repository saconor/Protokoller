import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Login from '@/views/Login.vue';
import { paths } from './paths';
import { UserRoles } from '@/rights/userRights';


const routes: Array<RouteRecordRaw & { meta: { right?: UserRoles } }> = [
  {
    path: paths.HOME(),
    name: 'Home',
    meta: {
      right: UserRoles.ALL,
    },
    component: Home,
  },
  {
    path: paths.LOGIN(),
    name: 'Login',
    meta: {
      right: UserRoles.ALL,
    },
    component: Login,
  },
  {
    path: paths.MEETING(),
    name: 'Meetings',
    meta: {
      right: UserRoles.ALL,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Meetings.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not Found',
    meta: {
      right: UserRoles.ALL,
    },
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
