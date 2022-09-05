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
  },
  methods: {
    timeOut() {
      setTimeout(() => {
        this.show = false
      }, 1000)
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
