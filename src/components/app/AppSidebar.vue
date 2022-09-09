<template>
  <div>
    <div class="main-header-left d-none d-lg-block">
      <div class="logo-wrapper">
        <router-link to="/" class="logo-link">
          <img
            width="42"
            height="42"
            src="/img/icons/grand-icon.svg"
            alt="logo"
            class="logo-link--image"
          />
          <span class="logo-link--title">GRAND TIME</span>
        </router-link>
      </div>
    </div>

    <div class="avatar"></div>
    <div class="name">Joey</div>
    <div class="company">Marketing company</div>
    <div class="wallet">
      <img src="/img/icons/wallet.svg" />
      125.45 USD / 125 GRAND
    </div>

    <div class="sidebar custom-scrollbar">
      <ul
        class="sidebar-menu"
        id="myDIV"
        :style="[
          layout.settings.sidebar.type == 'horizontal_sidebar'
            ? layout.settings.layout_type == 'rtl'
              ? { 'margin-right': margin + 'px' }
              : { 'margin-left': margin + 'px' }
            : { margin: '0px' }
        ]"
      >
        <li
          class="left-arrow"
          :class="{
            'd-none':
              layout.settings.layout_type == 'rtl'
                ? hideLeftArrowRTL
                : hideLeftArrow
          }"
          @click="
            layout.settings.sidebar.type === 'horizontal_sidebar' &&
            layout.settings.layout_type === 'rtl'
              ? scrollToLeftRTL()
              : scrollToLeft()
          "
        >
          <i class="fa fa-angle-left"></i>
        </li>
        <li
          v-for="(menuItem, index) in menuItems"
          :key="index"
          class="sidebar-menu__item mb-3"
          :class="{ active: menuItem.active, hidden: menuItem.hidden }"
        >
          <!-- Sub -->
          <a
            href="javascript:void(0)"
            class="sidebar-header"
            v-if="menuItem.type == 'sub'"
            @click="setNavActive(menuItem, index)"
          >
            <img :src="`/img/icons/menu/${menuItem.icon}.svg`" />
            <span class="ml-3">
              {{ $t(menuItem.title) }}
              <span
                :class="'badge badge-pill badge-' + menuItem.badgeType"
                v-if="menuItem.badgeType"
                >{{ menuItem.badgeValue }}</span
              >
            </span>
            <i
              class="fa fa-angle-right pull-right"
              v-if="menuItem.children"
            ></i>
          </a>
          <!-- Link -->
          <router-link
            :to="menuItem.path"
            class="sidebar-header"
            v-if="menuItem.type == 'link'"
          >
            <img :src="`/img/icons/menu/${menuItem.icon}.svg`" />
            <span class="ml-3">
              {{ $t(menuItem.title) }}
              <span
                :class="'badge badge-' + menuItem.badgeType + ' ml-3'"
                v-if="menuItem.badgeType"
                >{{ menuItem.badgeValue }}</span
              >
            </span>
            <i
              class="fa fa-angle-right pull-right"
              v-if="menuItem.children"
            ></i>
          </router-link>
          <!-- External Link -->
          <a
            :href="menuItem.path"
            class="sidebar-header"
            v-if="menuItem.type == 'extLink'"
            @click="setNavActive(menuItem, index)"
          >
            <img :src="`/img/icons/menu/${menuItem.icon}.svg`" />
            <span class="ml-3">
              {{ $t(menuItem.title) }}
              <span
                :class="'badge badge-' + menuItem.badgeType + ' ml-3'"
                v-if="menuItem.badgeType"
                >{{ menuItem.badgeValue }}</span
              >
            </span>
            <i
              class="fa fa-angle-right pull-right"
              v-if="menuItem.children"
            ></i>
          </a>
          <!-- External Tab Link -->
          <a
            :href="menuItem.path"
            target="_blank"
            class="sidebar-header"
            v-if="menuItem.type == 'extTabLink'"
            @click="setNavActive(menuItem, index)"
          >
            <img :src="`/img/icons/menu/${menuItem.icon}.svg`" />
            <span class="ml-3">
              {{ $t(menuItem.title) }}
              <span
                :class="'badge badge-' + menuItem.badgeType + ' ml-3'"
                v-if="menuItem.badgeType"
                >{{ menuItem.badgeValue }}</span
              >
            </span>
            <i
              class="fa fa-angle-right pull-right"
              v-if="menuItem.children"
            ></i>
          </a>
          <!-- 2nd Level Menu -->
          <ul class="sidebar-submenu" v-if="menuItem.children">
            <li
              v-for="(childrenItem, index) in menuItem.children"
              :key="index"
              :class="{ active: childrenItem.active, 'mb-3': true, 'mt-3': index === 0}"
            >
              <!-- Sub -->
              <a
                href="javascript:void(0)"
                v-if="childrenItem.type == 'sub'"
                @click="setNavActive(childrenItem, index)"
              >

                {{ $t(childrenItem.title) }}
                <span
                  :class="'badge badge-' + childrenItem.badgeType + ' pull-right'"
                  v-if="childrenItem.badgeType"
                >
                  {{ childrenItem.badgeValue }}
                </span>
                <i
                  class="fa fa-angle-right pull-right"
                  v-if="childrenItem.children"
                ></i>
              </a>
              <!-- Link -->
              <router-link
                :to="childrenItem.path"
                v-if="childrenItem.type == 'link'"
              >

                {{ $t(childrenItem.title) }}
                <span
                  :class="
                    'badge badge-' + childrenItem.badgeType + ' pull-right'
                  "
                  v-if="childrenItem.badgeType"
                  >{{ childrenItem.badgeValue }}</span
                >
                <i
                  class="fa fa-angle-right pull-right"
                  v-if="childrenItem.children"
                ></i>
              </router-link>
              <!-- External Link -->
              <a
                :href="childrenItem.path"
                v-if="childrenItem.type == 'extLink'"
              >

                {{ $t(childrenItem.title) }}
                <span
                  :class="
                    'badge badge-' + childrenItem.badgeType + ' pull-right'
                  "
                  v-if="childrenItem.badgeType"
                  >{{ childrenItem.badgeValue }}</span
                >
                <i
                  class="fa fa-angle-right pull-right"
                  v-if="childrenItem.children"
                ></i>
              </a>
              <!-- External Tab Link -->
              <a
                :href="childrenItem.path"
                target="_blank"
                v-if="childrenItem.type == 'extTabLink'"
              >

                <span>
                  {{ $t(childrenItem.title) }}
                  <i
                    class="pi pi-link text-info"
                    style="vertical-align: bottom"
                  ></i>
                </span>
                <span
                  :class="
                    'badge badge-' + childrenItem.badgeType + ' pull-right'
                  "
                  v-if="childrenItem.badgeType"
                  >{{ childrenItem.badgeValue }}</span
                >
                <i
                  class="fa fa-angle-right pull-right"
                  v-if="childrenItem.children"
                ></i>
              </a>
              <!-- 3rd Level Menu -->
              <ul
                class="sidebar-submenu horizontal-child-sub"
                v-if="childrenItem.children"
              >
                <li
                  v-for="(childrenSubItem, index) in childrenItem.children"
                  :key="index"
                >
                  <!-- Link -->
                  <router-link
                    :to="childrenSubItem.path"
                    v-if="childrenSubItem.type == 'link'"
                  >

                    {{ $t(childrenSubItem.title) }}
                    <span
                      :class="
                        'badge badge-' +
                        childrenSubItem.badgeType +
                        ' pull-right'
                      "
                      v-if="childrenSubItem.badgeType"
                      >{{ childrenSubItem.badgeValue }}</span
                    >
                    <i
                      class="fa fa-angle-right pull-right"
                      v-if="childrenSubItem.children"
                    ></i>
                  </router-link>
                  <!-- External Link -->
                  <a
                    :href="childrenSubItem.path"
                    v-if="childrenSubItem.type == 'extLink'"
                  >

                    {{ $t(childrenSubItem.title) }}
                    <span
                      :class="
                        'badge badge-' +
                        childrenSubItem.badgeType +
                        ' pull-right'
                      "
                      v-if="childrenSubItem.badgeType"
                      >{{ childrenSubItem.badgeValue }}</span
                    >
                    <i
                      class="fa fa-angle-right pull-right"
                      v-if="childrenSubItem.children"
                    ></i>
                  </a>
                  <!-- External Tab Link -->
                  <a
                    :href="childrenSubItem.path"
                    target="_blank"
                    v-if="childrenSubItem.type == 'extTabLink'"
                  >

                    {{ $t(childrenSubItem.title) }}
                    <span
                      :class="
                        'badge badge-' +
                        childrenSubItem.badgeType +
                        ' pull-right'
                      "
                      v-if="childrenSubItem.badgeType"
                      >{{ childrenSubItem.badgeValue }}</span
                    >
                    <i
                      class="fa fa-angle-right pull-right"
                      v-if="childrenSubItem.children"
                    ></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          class="right-arrow"
          :class="{
            'd-none':
              layout.settings.layout_type == 'rtl'
                ? hideRightArrowRTL
                : hideRightArrow
          }"
          @click="
            layout.settings.sidebar.type == 'horizontal_sidebar' &&
            layout.settings.layout_type == 'rtl'
              ? scrollToRightRTL()
              : scrollToRight()
          "
        >
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>

      <ul class="sidebar-menu">
        <li class="sidebar-menu__item mb-3">
          <a href="/need-help" class="sidebar-header">
            <img src="/img/icons/menu/need-help.svg">
            <span class="ml-3">
              Need help
            </span>
          </a>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppSidebar',
  data() {
    return {
      width: 0,
      height: 0,
      margin: 0,
      hideRightArrowRTL: true,
      hideLeftArrowRTL: true,
      hideRightArrow: true,
      hideLeftArrow: true,
      menuWidth: 0
    }
  },
  computed: {
    ...mapState({
      layout: (state) => state.layout.layout,
      sidebar: (state) => state.layout.sidebarType
    }),
    /** @returns { object } */
    menuItems() {
      const data = this.$store.getters.getAppMenuData
      return data
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    if (this.width < 991) {
      this.layout.settings.sidebar.type = 'default'
    }
    const val = this.sidebar
    if (val == 'default') {
      this.layout.settings.sidebar.type = 'default'
      this.layout.settings.sidebar.body_type = 'default'
    } else if (val == 'compact') {
      this.layout.settings.sidebar.type = 'compact-wrapper'
      this.layout.settings.sidebar.body_type = 'sidebar-icon'
    } else if (val == 'compact-icon') {
      this.layout.settings.sidebar.type = 'compact-page'
      this.layout.settings.sidebar.body_type = 'sidebar-hover'
    } else if (val == 'horizontal') {
      this.layout.settings.sidebar.type = 'horizontal_sidebar'
      this.layout.settings.sidebar.body_type = ''
    }
    setTimeout(() => {
      const elmnt = document.getElementById('myDIV')
      this.menuWidth = elmnt.offsetWidth
      this.menuWidth > window.innerWidth
        ? ((this.hideRightArrow = false), (this.hideLeftArrowRTL = false))
        : ((this.hideRightArrow = true), (this.hideLeftArrowRTL = true))
    }, 500)
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
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
  methods: {
    setNavActive(item) {
      this.$store.dispatch('setNavActive', item)
    },
    handleResize() {
      this.width = window.innerWidth - 310
    },
    scrollToRightRTL() {
      this.temp = this.width + this.margin
      // Checking condition for remaing margin
      if (this.temp === 0) {
        this.margin = this.temp
        this.hideRightArrowRTL = true
      }
      // else
      else {
        this.margin += this.width
        this.hideRightArrowRTL = false
        this.hideLeftArrowRTL = false
      }
    },
    scrollToLeftRTL() {
      // If Margin is reach between screen resolution
      console.log('this.margin', this.margin)
      if (this.margin <= -this.width) {
        this.margin += -this.width
        this.hideLeftArrowRTL = true
      }
      //Else
      else {
        this.margin += -this.width
        this.hideRightArrowRTL = false
      }
    },
    scrollToLeft() {
      console.log('left')

      // If Margin is reach between screen resolution
      if (this.margin >= -this.width) {
        this.margin = 0
        this.hideLeftArrow = true
      }
      //Else
      else {
        this.margin += this.width
        this.hideRightArrow = false
      }
    },
    scrollToRight() {
      this.temp = this.menuWidth + this.margin
      // Checking condition for remaing margin
      if (this.temp < this.menuWidth) {
        this.margin = -this.temp
        this.hideRightArrow = true
      }
      // else
      else {
        this.margin += -this.width
        this.hideLeftArrow = false
      }
    }
  }
}
</script>

<style lang="scss">
  .main-header-left {
    box-shadow: none !important;
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #D9D9D9;
    margin: 40px auto 10px;
  }

  .name {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    margin-bottom: 9px;
  }

  .company {
    font-size: 12px;
    line-height: 18px;
    color: #B5BBC6;
    text-align: center;
    margin-bottom: 24px;
  }

  .wallet {
    width: 211px;
    height: 55px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #7CD5A61A;
    border-radius: 3px;
    border-left: 2px solid #fff;
    padding: 0 18px;
    color: #fff;
    font-size: 12px;

    img {
      margin-right: 10px;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none !important;

    ul {
      flex-basis: auto;
    }
  }

  .sidebar-menu {
    flex-basis: 100%;

    &__item {
      &.hidden {
        display: none;
      }
      a {
        &.router-link-exact-active {

        }
      }
      &.active {
        a {
          &.sidebar-header {
            font-weight: bold !important;
          }
        }
      }

      .sidebar-submenu {

      }
    }
  }

  .logo-link {
    display: flex;
    align-items: center;
    gap: 15px;

    &--title {
      color: #fff;
      font-size: 20px;
      line-height: 31px;
      font-weight: 700;
    }
  }
</style>

