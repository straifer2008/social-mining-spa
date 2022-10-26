<template>
  <div id="app">
    <!-- Loader starts-->
    <GLoader :show="show" />
    <!-- Loader ends-->

    <!--<Main/>-->
    <RouterView v-slot="{ Component }">
      <transition name="layout-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <GToast
      position="top-right"
      :breakpoints="{
        '768px': {
          'max-width': '90%',
          width: 'fit-content',
          right: '0',
          'margin-right': '15px'
        }
      }"
    />
    <ConfirmPopup />
  </div>
</template>

<script>
import GLoader from '@/components/ui-elements/GLoader.vue'
import {getToken} from 'firebase/messaging'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: { GLoader },
  data() {
    return {
      show: true
    }
  },
  mounted() {
    this.timeOut()
    this.initNotifications()
  },
  methods: {
    ...mapActions('app',['updateDeviceHash']),
    timeOut() {
      setTimeout(() => {
        this.show = false
      }, 1000)
    },
    initNotifications(){
      const _this = this
      Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const messaging = this.$firebase_messaging
        getToken(messaging, {
          vapidKey:
            'BHjbUKFLL9I2amiJSDtu5uvlnqQj9IeEcEkgV03sBW-vybKRo_UKLl-PLL8CJjw6ZSt5y_iJ3Ag4DD_X9i2_kow'
        })
          .then((currentToken) => {
            if (currentToken) {
              _this.updateDeviceHash(currentToken)
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              // Show permission request UI
              console.log(
                'No registration token available. Request permission to generate one.'
              )
              // ...
            }
          })
          .catch((err) => {
            // console.log('An error occurred while retrieving token. ', err)
            // ...
          })
      }
      
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-fade {
  &-enter-active,
  &-leave-active {
    transition: 0.6s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
