import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserRoles, checkRight } from './rights/userRights';
import { UserWithRole } from './models/user.model';

const application = createApp(App).use(store).use(router).mount('#app');

router.beforeEach(async (to, from) => {
  const loggedInUser: { user: UserWithRole } = store.getters['userModule/loggedInUser'];
  if (
    to.path != '/login' &&
    !checkRight(loggedInUser?.user.roles[0].name, (to.meta['right'] as UserRoles) || UserRoles.RESTRICTED)
  ) {
    return '/login';
  }
  // ...
});
