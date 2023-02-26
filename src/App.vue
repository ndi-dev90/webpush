<script>
import { defineComponent } from 'vue'
import { useNotificationStore } from './stores/notificationStore'
export default defineComponent({
  name: `App`,
  data() {
    return {
      notificationStore: useNotificationStore(),
      show: true
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
        `Hello, you have just requested a notification, so here we go!`,
        5
      )
    }
  }
})
</script>

<template>
  <v-app class="w-100 h-100">
    <v-container class="d-flex justify-center align-center w-100 h-100">
      <v-card elevation="0">
        <v-card-text>
          <v-btn v-if="show" @click="requestPermission">WANT TO BE NOTIFIED!</v-btn>
          <v-btn v-else color="success" @click="notifyMe">NOTIFY ME IN 5s</v-btn>
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
</style>
