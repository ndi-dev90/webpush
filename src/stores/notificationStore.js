import { defineStore } from 'pinia'

const prevState = JSON.parse(localStorage.getItem(`noti-app`))

export const useNotificationStore = defineStore('notification', {
  state: () => {
    if (prevState) {
      return prevState.notification
    } else {
      return {
        permission: null
      }
    }
  },
  getters: {
    perm: (state) => {
      return state.permission
    }
  },
  actions: {
    sendNotification(title, text, timeout = 2) {
      if (this.permission === `granted`) {
        setTimeout(() => {
          navigator.serviceWorker.getRegistration('/').then((reg) => {
            reg.showNotification(title, { body: text })
          })
        }, timeout * 1000)
      } else {
        alert(
          `You have not granted notification permission. Please do grant permission at this page's browser settings.`
        )
      }
    },
    setPermission(permission) {
      this.permission = permission
      this.sendNotification(`HELLO`, `Hello there! Thanks for enabling notifications! :)`)
    }
  }
})
