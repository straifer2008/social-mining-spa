<template>
  <AppViewWrapper class="icons-view">
    <G-Card title="PrimeVue icons">
      <ul class="icons-list justify-content-between">
        <li
          v-for="(icon, idx) in PrimeIcons"
          :key="idx"
          class="icons-list__item"
        >
          <i :class="icon" style="font-size: 2rem"> </i>
          <span>{{ icon }}</span>
        </li>
      </ul>
    </G-Card>

    <G-Card title="Feather-Icons">
      <ul class="icons-list justify-content-between">
        <li
          v-for="(value, idx) in Object.keys(featherIcons.icons)"
          :key="idx"
          class="icons-list__item"
        >
          <vue-feather class="shopping-color" :type="value" size="36" />
          <span>{{ value }}</span>
        </li>
      </ul>
    </G-Card>

    <G-Card title="./public/img images & icons">
      <ul class="icons-list">
        <li
          v-for="(icon, idx) in publicImg"
          :key="idx"
          class="icons-list__item"
        >
          <img width="50" height="50" :src="icon" alt="icon" loading="lazy" />
        </li>
      </ul>
    </G-Card>

    <G-Card title="./public/img icons-symbol">
      <ul class="icons-list">
        <li
          v-for="(icon, idx) in iconsSymbol"
          :key="idx"
          class="icons-list__item"
        >
          <svg width="50" height="50" loading="lazy">
            <use :href="`/img/icons/icons-symbol.svg#${icon}`" />
          </svg>
        </li>
      </ul>
    </G-Card>
  </AppViewWrapper>
</template>

<script>
import AppViewWrapper from '@/components/app/AppViewWrapper.vue'
import { PrimeIcons } from 'primevue/api'
import featherIcons from 'feather-icons'

export default {
  name: 'IconsView',
  components: { AppViewWrapper },
  data() {
    return {
      PrimeIcons,
      featherIcons,
      publicImg: ['/img/icons/grand-icon.svg', '/img/user.png'],
      iconsSymbol: ['eye-hidden-icon', 'eye-icon', 'close-circle-icon']
    }
  }
}
</script>

<style lang="scss">
.icons-view {
  .icons-list {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      border-radius: 6px;
      box-shadow: 0 0 4px 0 #98a6ad;
      padding: 10px;

      span {
        font-size: 12px;
        color: var(--blue-700);
      }
    }
  }
}
</style>
