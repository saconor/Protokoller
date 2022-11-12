<template>
  <Menu
    v-if="$route.path !== '/login' && $route.path !== '/signup'"
    style="height: 6vh; width: 100%"
  ></Menu>

  <div
    id="contentPane"
    :style="{ 'overflow-y': 'auto', 'height': ($route.path === '/login' || $route.path === '/signup') ? '100vh' : '90vh' }"
  >
    <router-view />
  </div>

  <Footer v-if="$route.path !== '/login' && $route.path !== '/signup'" style="height: 4vh"></Footer>
</template>

<script setup lang="ts">
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;

  text-align: center;

  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
