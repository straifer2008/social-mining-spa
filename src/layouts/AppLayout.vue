<template>
  <div>
    <div class="page-wrapper" :class="layout.settings.sidebar.type">
      <AppHeader
        @clicked="sidebar_toggle"
        @mobileclicked="mobiletoggle_toggle"
      />
      <div class="page-body-wrapper" :class="layout.settings.sidebar.body_type">
        <div
          class="page-sidebar"
          :class="[
            { open: sidebar_toggle_var },
            layout.settings.sidebar_backround
          ]"
          :sidebar-layout="layout.settings.sidebar_setting"
        >
          <AppSidebar />
        </div>
        <div class="page-body">
          <AppMessageList />
          <router-view v-slot="{ Component }">
            <transition name="default-fade" mode="out-in">
              <component :is="Component" class="view" />
            </transition>
          </router-view>
        </div>
        <AppFooter />
      </div>
    </div>

    <TransferGrandDialog />
    <WithdrawalGrandDialog />
    <SetGrandWithdrawalWalletDialog />
    <StakeGrandDialog />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '@/components/app/AppHeader.vue'
import AppSidebar from '@/components/app/AppSidebar.vue'
import AppMessageList from '@/components/app/AppMessageList.vue'
import AppFooter from '@/components/app/AppFooter.vue'

import TransferGrandDialog from '@/components/dialogs/TransferGrandDialog.vue'
import WithdrawalGrandDialog from '@/components/dialogs/WithdrawalGrandDialog.vue'
import SetGrandWithdrawalWalletDialog from '@/components/dialogs/SetGrandWithdrawalWalletDialog.vue'
import StakeGrandDialog from '@/components/dialogs/StakeGrandDialog.vue'

export default {
  name: 'AppBody',
  data() {
    return {
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      resized: false
    }
  },
  // props:['sidebar_toggle_var'],
  components: {
    AppHeader,
    AppSidebar,
    AppMessageList,
    AppFooter,
    TransferGrandDialog,
    WithdrawalGrandDialog,
    SetGrandWithdrawalWalletDialog,
    StakeGrandDialog,
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.data,
      layout: (state) => state.layout.layout
    })
  },
  created() {
    this.$store.dispatch('GET_SHARED_DATA')

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.resized = this.sidebar_toggle_var
    this.$store.dispatch('layoutSet')
  },
  watch: {
    $route() {
      this.menuItems.filter((items) => {
        if (items.path === this.$route.path)
          this.$store.dispatch('setActiveRoute', items)
        if (!items.children) return false
        items.children.filter((subItems) => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch('setActiveRoute', subItems)
          if (!subItems.children) return false
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch('setActiveRoute', subSubItems)
          })
        })
      })
    },
    sidebar_toggle_var: function () {
      this.resized =
        this.width <= 991 ? !this.sidebar_toggle_var : this.sidebar_toggle_var
    }
  },
  methods: {
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value
    },
    handleResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.default-fade {
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
