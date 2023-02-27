<script>
import { defineComponent } from 'vue'
import { useNotificationStore } from './stores/notificationStore'
export default defineComponent({
  name: `App`,
  data() {
    return {
      notificationStore: useNotificationStore(),
      show: true,
      text: null
    }
  },
  mounted() {
    if (!this.notificationStore.perm) {
      const state = Notification.permission
      if (state === `default`) {
        this.show = true
      } else {
        this.show = false
      }
    } else {
      if (this.notificationStore.perm === `default`) {
        this.show = true
      } else {
        this.show = false
      }
    }
    this.notificationStore.$subscribe((mutation, state) => {
      console.log(mutation)
      this.text = JSON.stringify(state)
    })
  },
  methods: {
    requestPermission() {
      try {
        Notification.requestPermission().then((permission) => {
          this.notificationStore.setPermission(permission)
        })
      } catch (e) {
        alert(`The browser or environment does not support push notifications! :(`)
        console.error(`ERROR: ${e.message}`)
      }
    },
    notifyMe() {
      this.notificationStore.sendNotification(
        `Scheduled notification`,
        `Hello, you have just requested a notification, so here we go!`,
        5
      )
    },
    notifyMeNow() {
      this.notificationStore.sendNotification(
        `Instant notification`,
        `This is an instant notification with some emojis: 💁👌🎍😍!`,
        0
      )
    },
    notifyMe8() {
      this.notificationStore.sendNotification(`888`, `888`, 0)
    }
  }
})
</script>

<template>
  <v-app class="w-100 h-100" style="background-color: transparent">
    <v-container class="d-flex justify-center align-center w-100 h-100">
      <v-card elevation="0" style="background-color: transparent">
        <v-card-text>
          <v-btn v-if="show" @click="requestPermission">WANT TO BE NOTIFIED!</v-btn>
          <v-row v-else>
            <v-col cols="12" class="d-flex justify-center"
              ><v-btn color="success" @click="notifyMe">NOTIFY ME IN 5s</v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn color="error" @click="notifyMeNow">NOTIFY ME NOW</v-btn>
            </v-col>
          </v-row>
          <pre color="gray" class="my-5 text-center">{{ text }}</pre>
          <v-row>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn color="secondary" @click="notifyMe8">ANOTHER</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
pre {
  background-color: black;
  color: white;
  padding: 1rem;
  border-radius: 6px;
}
</style>
