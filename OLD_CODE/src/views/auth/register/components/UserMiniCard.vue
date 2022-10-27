<template>
  <div class="user-mini-card card">
    <div class="user-mini-card--body card-body d-flex align-items-center">
      <div class="avatar">
        <img
          :src="user.photo || '/img/user.png'"
          alt="user avatar"
          class="img-50 rounded-circle"
        />
      </div>
      <div class="info ml-2">
        <h6 class="info-item name">Ваш реферер</h6>
        <h6 class="info-item value">{{ user.name }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMiniCard',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.user-mini-card {
  margin-bottom: 0;

  &--body {
    background-color: #e0e0e0 !important;
    border-radius: 4px;
    box-shadow: 0 0 4px 0px #929292;
    padding: 5px !important;

    .info {
      text-align: center;

      .info-item {
        margin: 0;

        &.name {
          max-width: 120px;
          font-size: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &.value {
          max-width: 120px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
