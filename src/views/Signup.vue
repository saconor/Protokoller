<template>
  <div class="loginPage">
    <div class="loginElement">
      <div class>Sign Up</div>
      <form @submit.prevent="signup" method="post" class="d-flex flex-column">
        <label for="first_name">First Name</label>
        <input id="first_name" type="text" v-model="name" placeholder="name" autocomplete="name" />
        <label for="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          v-model="last_name"
          placeholder="last_name"
          autocomplete="family-name"
        />
        <label for="user_name">Username</label>
        <input
          id="user_name"
          type="text"
          v-model="username"
          placeholder="username"
          autocomplete="off"
        />
        <label for="email">Email</label>
        <input id="email" type="text" v-model="email" placeholder="email" autocomplete="email" />
        <label for="password">Password</label>
        <input
          id="password"
          autocomplete="off"
          type="password"
          v-model="password"
          placeholder="enter password"
        />
        <input type="password" placeholder="confirm password" />
        <div class="d-flex mt-4">
          <button class="btn btn-success col me-2">Sign Up</button>
          <button
            role="button"
            class="btn btn-outline-secondary col ms-2"
            @click="$router.push({ path: '/login' })"
          >Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserWithRole } from '../models/user.model';
import store from '../store';

  let username = ref('');
  let password = ref('');
  let email = ref('');
  let last_name = ref('');
let name = ref('');
const router = useRouter();

  async function signup(event: any): Promise<void> {
    console.log(event);
    let request = await fetch('http://localhost:8082/api/auth/signup', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        last_name: last_name,
        name: name,
      }),
    });
    if (request.ok) {
      console.log('router');
      const user = (await request.json()).data as UserWithRole;

      await store.dispatch('userModule/setLoggedInUser', {
        user,
      });
      router.push({ path: '/login' });
    }
  }

</script>

<style lang="css" scoped>
.loginPage {
  background-image: url("@/assets/el15.png");
  background-size: auto;
  height: 100vh;
  background-size: 100vw 100vh;
}

label {
  text-align: left;
  margin-top: 1rem;
  font-size: small;
  font-weight: 600;
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
>
