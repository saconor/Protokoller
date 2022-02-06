<template>
  <div class>
    <div class="mt-5 d-flex" style="justify-content:center;">
      <h3>Wilkommen sveh!</h3>
      <div class style="width:2rem;height:2rem;background-color:black;border-radius:2rem"></div>
    </div>
    <div class="ps-3 pt-5" style="text-align:initial">
      <div class>
        <h4>Nächste Meetings</h4>
        <div class>Es stehen keine geplanten Meetings an</div>
      </div>
    </div>
    <div class="ps-3 pt-5" style="text-align:initial">
      <div class>
        <h4>Meine Ablage</h4>
        <div class>Es gibt für sie noch keine Dokumente</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({

})
export default class Home extends Vue { }
</script>
