<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ps-3">
    <a class="navbar-brand" @click.prevent="accesPage('home')">
      <img src="../assets/el2.png" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active flex-column d-flex">
          <div
            class="arrow"
            :class="{ 'arrow-down': $route.path.trim().includes('home') }"
            style="align-self:center"
          ></div>
          <a class="nav-link" @click.prevent="accesPage('home')">Start</a>
        </li>
        <li class="nav-item active flex-column d-flex">
          <div
            class="arrow"
            :class="{ 'arrow-down': $route.path.trim().includes('meeting') }"
            style="align-self:center"
          ></div>
          <a class="nav-link" @click.prevent="accesPage('meeting')">Meetings</a>
        </li>
        <li class="nav-item active flex-column d-flex">
          <div
            class="arrow"
            :class="{ 'arrow-down': $route.path.trim().includes('storage') }"
            style="align-self:center"
          ></div>
          <a class="nav-link" @click.prevent="accesPage('storage')">Ablage</a>
        </li>
        <li class="nav-item active flex-column d-flex">
          <div
            class="arrow"
            :class="{ 'arrow-down': $route.path.trim().includes('team') }"
            style="align-self:center"
          ></div>
          <a class="nav-link" @click.prevent="accesPage('team')">Team</a>
        </li>

        <li class="nav-item active flex-column d-flex">
          <div
            class="arrow"
            :class="{ 'arrow-down': $route.path.trim().includes('none') }"
            style="align-self:center"
          ></div>
          <a class="nav-link disabled" href="/diasbled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex my-2 my-lg-0 pe-3">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {
  accesPage(route: string): void {
    this.$router.push({ path: "/" + route })
  }

}
</script>

<style>
.navbar {
  background-color: #e5e5e55b !important;
  border-bottom: 1px solid lightgrey;
}

.nav-item {
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(100, 100, 100, 0.1);
}

.arrow {
  display: block;
  position: absolute;
  width: 0px;
  height: 0px;
  border: 7px solid transparent;
}
.arrow.arrow-up {
  border-bottom-color: rgb(209, 120, 18);
  border-top-width: 0px;
}
.arrow.arrow-down {
  border-top-color: rgb(209, 120, 18);
  border-bottom-width: 0px;
}
.arrow.arrow-left {
  border-right-color: rgb(209, 120, 18);
  border-left-width: 0px;
}
.arrow.arrow-right {
  border-left-color: rgb(209, 120, 18);
  border-right-width: 0px;
}
</style>
