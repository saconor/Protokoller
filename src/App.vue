<template>
  <Menu style="height:6vh;width:100%;"></Menu>
  <div style="height:90vh;overflow-y:auto">
    <router-view />
  </div>
  <Footer style="height:4vh"></Footer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";

@Options({
  components: { Menu, Footer },
})
export default class extends Vue { }
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
