<template>
  <div>
    <!-- page-wrapper Start-->
    <div class="page-wrapper" id="canvas-bookmark">
      <!-- Page Header Start-->
      <div class="page-main-header" :class="{ open: toggle_sidebar_var }">
        <div class="main-header-right row">
          <div class="main-header-left d-lg-none">
            <div class="logo-wrapper">
              <router-link :to="{ name: 'default' }"
                ><img
                  width="42"
                  height="42"
                  src="/img/icons/grand-icon.svg"
                  alt="grand-icon"
              /></router-link>
            </div>
          </div>
          <div class="mobile-sidebar">
            <div class="media-body text-right switch-sm">
              <label class="switch" v-on:click="toggle_sidebar">
                <vue-feather type="align-left"></vue-feather>
              </label>
            </div>
          </div>
          <div class="nav-right col">
            <ul class="nav-menus" :class="{ open: mobile_toggle }">
              <li></li>
              <li></li>

              <li class="onhover-dropdown">
                <vue-feather type="bell"></vue-feather><span class="dot"></span>
                <ul class="notification-dropdown onhover-show-div">
                  <li>
                    Notification
                    <span class="badge badge-pill badge-primary pull-right"
                      >3</span
                    >
                  </li>
                  <li>
                    <div class="media">
                      <div class="media-body">
                        <h6 class="mt-0">
                          <span
                            ><vue-feather
                              class="shopping-color"
                              type="shopping-bag"
                            ></vue-feather></span
                          >Your order ready for Ship..!<small class="pull-right"
                            >9:00 AM</small
                          >
                        </h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetuer.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media">
                      <div class="media-body">
                        <h6 class="mt-0 txt-success">
                          <span
                            ><vue-feather
                              class="download-color font-success"
                              type="download"
                            ></vue-feather></span
                          >Download Complete<small class="pull-right"
                            >2:30 PM</small
                          >
                        </h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetuer.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media">
                      <div class="media-body">
                        <h6 class="mt-0 txt-danger">
                          <span
                            ><vue-feather
                              class="alert-color font-danger"
                              type="alert-circle"
                            ></vue-feather></span
                          >250 MB trash files<small class="pull-right"
                            >5:00 PM</small
                          >
                        </h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetuer.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="bg-light txt-dark">
                    <a href="#">All</a> notification
                  </li>
                </ul>
              </li>

              <li class="onhover-dropdown">
                <div class="media align-items-center">
                  <img
                    class="align-self-center pull-right img-50 rounded-circle"
                    src="@/assets/images/dashboard/user.png"
                    alt="header-user"
                  />
                  <div class="dotted-animation">
                    <span class="animate-circle"></span
                    ><span class="main-circle"></span>
                  </div>
                </div>
                <ul class="profile-dropdown onhover-show-div p-20">
                  <li>
                    <a href="#"
                      ><vue-feather type="user"></vue-feather> Edit Profile</a
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><vue-feather type="mail"></vue-feather> Inbox</a
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><vue-feather type="lock"></vue-feather> Lock Screen</a
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><vue-feather type="settings"></vue-feather> Settings</a
                    >
                  </li>
                  <li>
                    <a href="#" @click.prevent="onLogout">
                      <vue-feather type="log-out"></vue-feather> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div
              class="d-lg-none mobile-toggle pull-right"
              v-on:click="mobile_toggle = !mobile_toggle"
            >
              <vue-feather type="more-horizontal"></vue-feather>
            </div>
          </div>
        </div>
      </div>
      <!-- Page Header Ends -->
    </div>
  </div>
</template>

<script>
import LangSwitcher from '@/components/LangSwitcher.vue'

export default {
  name: 'AppHeader',
  components: {
    LangSwitcher
  },
  data() {
    return {
      toggle_sidebar_var: false,
      clicked: false,
      mobile_toggle: false
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('LOGOUT')
      setTimeout(() => {
        this.$router.push({ name: 'Login' })
      }, 500)
    },
    toggle_sidebar() {
      this.toggle_sidebar_var = !this.toggle_sidebar_var
      this.clicked = !this.toggle_sidebar_var
      this.$emit('clicked', this.clicked)
    },
    testNotice() {
      console.log('on testNotice')
      this.$notice({ life: 0 })
    }
  }
}
</script>
