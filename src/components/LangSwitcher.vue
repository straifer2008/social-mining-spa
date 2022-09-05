<template>
  <component :is="tag" class="onhover-dropdown lang-switcher">
    <a class="txt-dark" href="#">
      <h6>{{ currentLang }}</h6></a
    >
    <ul class="language-dropdown onhover-show-div p-20">
      <li
        v-for="lang in langs"
        :key="lang.code"
        class="language-dropdown__item"
        :class="{ active: lang.code === $i18n.locale }"
      >
        <a href="#" :data-lng="lang.code" @click.prevent="setLocale(lang.code)">
          <i class="flag-icon" :class="`flag-icon-${lang.icon}`"></i>
          {{ lang.name }}
        </a>
      </li>
    </ul>
  </component>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LangSwitcher',
  props: {
    tag: {
      type: String,
      default: 'li'
    }
  },
  data() {
    return {
      langsIcons: {
        en: 'gb',
        ru: 'ru'
      }
    }
  },
  computed: {
    ...mapGetters(['SHARED_DATA', 'USER_LANGUAGE']),
    incomingLangs() {
      let systemLanguages = {}
      if (this.SHARED_DATA) {
        this.SHARED_DATA.languages
          .filter((el) => el.isMain)
          .forEach((el) => {
            el.code = el.code.substr(0, 2)
            systemLanguages[el.code] = { ...el }
          })
      }
      return systemLanguages
    },
    langs() {
      let data = []
      if (Object.keys(this.incomingLangs).length) {
        data = this.$i18n.availableLocales.map((el) => ({
          name: this.incomingLangs[el]?.name || el,
          code: el,
          icon: this.langsIcons[el] || 'ua'
        }))
      }
      return data
    },
    currentLang() {
      return this.$i18n.locale.toUpperCase()
    }
  },
  methods: {
    setLocale(code) {
      if (code === this.$i18n.locale) return

      this.$i18n.locale = code

      this.$store.dispatch('CHANGE_USER_LANGUAGE', {
        language: this.incomingLangs[code].id,
        code
      })
    }
  },
  watch: {
    USER_LANGUAGE: {
      immediate: true,
      handler(val) {
        const userLang = val?.code
        const i18nLang = this.$i18n.locale
        if (userLang && userLang !== i18nLang) {
          this.setLocale(userLang)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.lang-switcher {
  .language-dropdown {
    padding: 14px;

    &__item {
      width: 100%;
      padding: 6px !important;
      border-radius: 4px;
      cursor: default;

      a {
        user-select: none;
      }

      &.active {
        background-color: var(--blue-100);

        a {
          cursor: default;
        }
      }
    }
  }
}
</style>
