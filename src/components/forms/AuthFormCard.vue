<template>
  <div class="authentication-box auth-form">
    <div class="card mb-0">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthFormCard'
}
</script>

<style lang="scss">
.auth-form {
  &--title {
    font-size: 40px;
    font-weight: 500;
    line-height: 56px;
    margin-bottom: 40px;
  }

  .card-body {
    padding: 40px;
    box-shadow: 0 20px 30px 0 #7E7E7E0D;
    background: #FFFFFF;
    border-radius: 10px;
    width: 680px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
}
</style>
