import { defineStore } from 'pinia'

const prevState = JSON.parse(localStorage.getItem(`noti-app`))

export const useNotificationStore = defineStore('notification', {
  state: () => {
    if (prevState) {
      prevState.notification.reg = null
      return prevState.notification
    } else {
      return {
        permission: null,
        reg: null
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
      if (title === `888` && text === `888`) {
        navigator.serviceWorker.getRegistration('/webpush/').then((reg) => {
          console.log('SWRE', reg)
          reg.active.postMessage({ test: `tstt` })
        })
      } else {
        if (this.permission === `granted`) {
          setTimeout(() => {
            /*navigator.serviceWorker.controller.postMessage(
            `next message: ${title}, after ${timeout} secs`
          )*/
            navigator.serviceWorker.getRegistration('/webpush/').then((reg) => {
              console.log('SW REGgg', reg)
              reg.active.postMessage(`next message: ${title}, after ${timeout} secs`)
              this.reg = reg.id
              reg.showNotification(title, { body: text })
            })
          }, timeout * 1000)
        } else {
          alert(
            `You have not granted notification permission. Please do grant permission at this page's browser settings.`
          )
        }
      }
    },
    setPermission(permission) {
      this.permission = permission
      this.sendNotification(`HELLO`, `Hello there! Thanks for enabling notifications! :)`)
    }
  }
})
