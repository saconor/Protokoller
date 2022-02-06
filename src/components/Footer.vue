<template>
  <div class="footer">2022 Sven Ehses</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue { }
</script>

<style>
.footer {
  background-color: #e5e5e55b !important;
  border-top: 1px solid lightgrey;
  color: grey;
}
</style>
