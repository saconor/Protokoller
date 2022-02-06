import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserRoles } from './rights/userRights';

function checkRight(userRole: string, role: UserRoles): boolean {
  return userRole in UserRoles && userRole === role;
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = false;
  const loggedInUser = { userRole: 'Admin' };
  if (
    !isAuthenticated &&
    to.path != '/login' &&
    !checkRight(loggedInUser.userRole, (to.meta['rights'] as UserRoles) || UserRoles.RESTRICTED)
  )
    next({ path: '/login' });
  else next();
  // ...
});

createApp(App).use(store).use(router).mount('#app');
