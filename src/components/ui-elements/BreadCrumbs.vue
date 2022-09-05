<template>
  <div class="container-fluid">
    <div class="page-header">
      <div class="page-header-left">
        <h3>{{ $t('routeNames.' + title) }}</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ path: '/' }"
              ><vue-feather type="home"></vue-feather
            ></router-link>
          </li>
          <li class="breadcrumb-item" v-if="main">{{ main }}</li>
          <li class="breadcrumb-item active" v-if="title">{{ title }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumbs',
  props: {
    title: {
      default: 'home'
    },
    main: {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  &-left {
    display: flex;
    align-items: center;

    @media (max-width: 991px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
