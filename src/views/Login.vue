<template>
  <div class="position-relative loginPage">
    <div class="loginElement">
      <div class="h4">Login</div>
      <form class="d-flex flex-column" style="text-align: left" @submit.prevent="login()">
        <div class="form-group" aria-label="Please enter username">
          <label for="usernameInput">Username</label>
          <input
            type="text"
            class="form-control"
            id="usernameInput"
            name="username"
            v-model="username"
            placeholder="Username or email"
            aria-placeholder="Username or email"
          />
        </div>
        <div class="form-group" aria-label="Please enter password">
          <label class="mt-3" for="userPassword">Password</label>
          <input
            id="userPassword"
            class="form-control"
            type="password"
            v-model="password"
            name="password"
          />
        </div>

        <button role="submit" class="mt-4 btn btn-secondary">Login</button>
        <div class="mt-2">
          No Account yet?,
          <a href="#">Sign up</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { UserWithRole } from '@/models/user.model';
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Login extends Vue {
  username = '';
  password = '';

  async login(): Promise<void> {
    let request = await fetch('http://localhost:8082/api/auth/signin', {
      method: 'POST',
      credentials: "include",
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ username: this.username, password: this.password }),
    });
    if (request.ok) {
      const user = (await request.json()).data as UserWithRole

      await store.dispatch('userModule/setLoggedInUser', {
        user,
      });
      this.$router.push({ path: '/home' });
    }

  }

}
</script>

<style scoped>
label {
  padding-left: 5px;
}

.loginPage {
  background-image: url("@/assets/el15.png");
  background-size: auto;
  height: 100vh;
  background-size: 100vw 100vh;
}

.loginElement {
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
  position: relative;
  width: 30rem;
  top: 20vh;
  padding: 2rem;
  border: 1px solid lightgrey;
  border-radius: 0.5rem;
  background: inherit;
}

.loginElement:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
}
</style>
