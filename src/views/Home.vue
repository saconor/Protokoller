<template>
  <div class>
    <div class="mt-5 d-flex" style="justify-content: center">
      <h3>Wilkommen {{ loggedInUser.user.username }}</h3>

      <div class style="width: 2rem; height: 2rem; background-color: black; border-radius: 2rem"></div>
    </div>

    <div class="ps-3 pt-5" style="text-align: initial">
      <div class>
        <h4>Nächste Meetings</h4>

        <div class>Es stehen keine geplanten Meetings an</div>
      </div>
    </div>

    <div class="ps-3 pt-5" style="text-align: initial">
      <div class>
        <h4>Meine Ablage</h4>

        <div class>Es gibt für sie noch keine Dokumente</div>
        <button class="btn btn-secondary" @click="check">TEst</button>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { UserWithRole } from '../models/user.model';
import store from '../store';
import { defineComponent } from 'vue';


  const loggedInUser:{
  user:UserWithRole
} = store.getters['userModule/loggedInUser'];

  async function check(): Promise<void> {
    let request = await fetch('http://localhost:8082/api/auth/check', {
      method: 'GET',
      credentials: "include"
    });
    console.log(request);
  }

</script>

