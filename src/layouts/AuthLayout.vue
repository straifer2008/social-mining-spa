<template>
  <div class="auth-layout">
    <div class="auth-layout__content">
      <RouterView v-slot="{ Component }">
        <transition name="view-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(45deg, #0c5aff, #3db9ff);
  padding: 50px 15% 50px 0;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(/img/icons/grand-icon.svg);
    background-size: 50%;
    background-position: 0 40%;
    background-repeat: no-repeat;
    @media (max-width: 768px) {
      background-size: 20%;
      background-repeat: repeat;
      background-position: unset;
    }
  }

  &__content {
    position: relative;
    height: 100%;
    max-width: 680px;
    margin-left: auto;
    perspective: 1000px;

    @media (max-width: 1024px) {
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }

    @media (max-width: 420px) {
      display: block;
    }
  }

  .view-fade-enter-active,
  .view-fade-leave-active {
    transition: transform 0.3s 0.2s ease-out;
  }

  .view-fade-enter-from,
  .view-fade-leave-to {
    // filter: blur(5px);
    transform: rotateY(90deg);
  }
}
</style>
