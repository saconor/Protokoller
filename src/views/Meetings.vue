<template>
  <div class v-if="!meetingStarted">
    <button class="btn btn-secondary mt-5" @click="prepareMeeting()">Meeting Aufsetzen</button>
  </div>
  <div class="ms-3" style="text-align: left" v-else>
    <div class="h2 mt-3">{{ generateMeetingTitle() }}</div>
    <hr />
    <div class="h4">Start:{{ meetingStart.format('HH:mm:ss') }}</div>
    <div class="h4">Dauer:{{ meetinTime }}</div>
    <div>
      <div class="h5 mt-3 text-underline">Teilnehmer</div>
      <ul>
        <li v-for="user in userList" class="userEntry" :key="user">
          <div class="d-flex">
            <div class>{{ user }}</div>
            <button class="ms-4 removeButton">-</button>
          </div>
        </li>
      </ul>
      <div class="d-flex">
        <input v-model="userInput" type="text" @keydown.enter="addUserToMeeting" />
        <button class="btn btn-secondary" @click="addUserToMeeting">Neuen Teilnehmer hinzufügen</button>
      </div>
    </div>
    <div class>
      <div class="h5 text-underline mt-3">Themenliste</div>
      <ul v-if="topicList.length > 0">
        <li v-for="topic in topicList" :key="topic.title">{{ topic.title }}</li>
      </ul>
      <div v-else>Noch keine Themen vorhanden</div>
    </div>
    <div class>
      <div class="h5 mt-3 text-underline mb-2" style="width: 90vw">Details</div>
      <div class="topiclist">
        <div class="d-flex flex-column mb-5" v-for="(topic, index) in topicList" :key="index">
          <input
            type="text"
            placeholder="Bitte Titel eingeben"
            style="width: 30rem"
            v-model="topic.title"
            @keydown.enter="addTopicToMeeting(index, topic.title, topic.text)"
          />
          <textarea
            v-model="topic.text"
            cols="100"
            rows="5"
            class="mt-1"
            placeholder="Bitte Inhalt eingeben"
            style="resize: both; width: 50rem"
            @keydown.enter="addTopicToMeeting(index, topic.title, topic.text)"
          ></textarea>
        </div>
        <button
          class="btn btn-secondary mt-3"
          @click="addTopicToMeeting(-1, '', '')"
        >Neues Thema Hinzufügen</button>
      </div>
    </div>
    <button
      class="btn btn-secondary mt-3"
      v-if="preparePhase"
      @click.prevent="stopTimer"
    >Meeting Stoppen</button>
    <div class="d-flex mt-3" v-else>
      <button
        class="btn btn-secondary"
        @click.prevent="generateMeetingMinutes()"
      >Meeting-Minutes Generieren</button>
      <select
        name="meetingFormat"
        class="form-control ms-1"
        style="width: max-content"
        v-model="meetingformat"
      >
        <option value="JSON" selected>JSON</option>
        <option value="TEXT">TEXT</option>
        <option value="RTF">RTF</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserWithRole } from '../models/user.model';
import store from '../store';
import dayjs, { Dayjs } from 'dayjs';
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

 const loggedInUser: { user: UserWithRole } = store.getters['userModule/loggedInUser'];

  let meetingStarted = ref(false);
  let preparePhase = ref(true);
  let userList: any[] = ref([]as any);
  let userInput = ref('');
  let topicList: { title: string; text: string }[] = ref([] as any);
  let meetingformat = ref('JSON');

  let interval: any = ref(null);
  let meetingStart: Dayjs = dayjs() ;
  let currentTime: Dayjs = dayjs();
  let clock = 0;

  function startTimer(): void {
    clearInterval(interval);
    interval = setInterval(() => {
      currentTime = dayjs();
    }, 1000);
  }

  async function generateMeetingMinutes(): Promise<void> {
    let proceed = false;
    const body = {
      STARTING_TIME: meetingStart.format('HH:mm:ss'),
      MEETING_TITLE: 'Meeting Minutes',
      MEETING_DATE: meetingStart.format('dd,DD.MM.YYYY'),
      DURATION: meetinTime,
      TEILNEHMER: userList,
      DETAILS: topicList,
      THEMA: topicList.map(topic => topic.title),
    };
    if (meetingformat.value == 'JSON') {
      generateJSONMeetingMinutes(body);
      proceed = true;
    } else {
      const request = await fetch('http://localhost:8082/meeting/generate', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(body),
      });

      if (request.ok) {
        proceed = true;
      }
    }
    if (proceed) {
      preparePhase.value = true;
      meetingStarted.value = false;
      userList = [];
      topicList = [];
      userInput.value = '';
    }
  }

  function generateJSONMeetingMinutes(jsObject: any): void {
    const bytes = new TextEncoder().encode(JSON.stringify(jsObject));
    const blob = new Blob([bytes], {
      type: 'application/json;charset=utf-8',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'meeting_minutes.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    alert('your file has downloaded!');
  }

  async function stopTimer(): Promise<void> {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    preparePhase.value = false;
  }

  const meetinTime = computed(() => {
    const diff = currentTime.diff(meetingStart, 'second');
    const mindiff = Math.floor(diff / 60);
    const secdiff = diff % 60;
    return (mindiff > 9 ? mindiff : '0' + mindiff) + ':' + (secdiff > 9 ? secdiff : '0' + secdiff);
  })

  function prepareMeeting(): void {
    currentTime = dayjs();
    meetingStart = dayjs();
    meetingStarted.value = true;
    preparePhase.value = true;
    startTimer();
  }

  function addTopicToMeeting(index: number, topicName: string, topicText: string): void {
    let topic = topicList[index];
    let newTopic = { title: topicName, text: topicText };
    if (topic != null) {
      topicList[index] = newTopic;
      let el = document.querySelector("div#contentPane")
      if (el != null)
        el.scroll(0, 20000)
      else {
        console.log("test,", el)
      }
    } else {
      topicList.push(newTopic);
    }
  }

  function addUserToMeeting(): void {
    if (userInput.value != '') {
      userList.push(userInput);
      userInput.value = '';
    }
  }

  function generateMeetingTitle() {
    return dayjs().format('[Meeting Minutes] dd,DD.MM.YYYY');
  }


</script>

<style scoped>
.text-underline {
  text-decoration: underline;
}
.userEntry .removeButton {
  display: none;
}
.userEntry:hover .removeButton {
  display: unset;
}
</style>
