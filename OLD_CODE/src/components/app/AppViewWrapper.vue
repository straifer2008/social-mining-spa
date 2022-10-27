<template>
  <div class="app-view-wrapper">
    <!-- <BreadCrumbs :title="breadCrumbsTitle || $route.name" /> -->

    <div class="container-fluid">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppViewWrapper',
  props: {
    breadCrumbsTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
