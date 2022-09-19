<template>
  <div class="auth-layout">
    <div class="auth-layout__left" >
      <img class="logo" src="/img/Logo.svg" />
			<div v-if="showIntro">
				<h1>Welcome to Grand Time social mining platform!</h1>
				<div class="desc">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				</div>
				<div class="in-action">
					<img src="/img/icons/seeInAction.svg" />
					See in action
				</div>
				<div
					class="get-started"
					v-if="windowWidth <= 1200"
					@click="hideIntro"
				>
					Get Started
				</div>
			</div>
    </div>
    <div v-if="windowWidth > 1200 || !showIntro" class="auth-layout__form">
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
  name: 'AuthLayout',
	data() {
    return {
      windowWidth: window.innerWidth,
			showIntro: true,
		}
	},

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
		hideIntro() {
      this.showIntro = false
		}
  }

}
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  background: url('/img/Background.svg');
  background-size: cover;
  padding: 30px 198px 30px 80px;

  @media (max-width: 1400px) {
    padding: 30px;
  }

	@media (max-width: 1200px) {
		flex-direction: column;
		justify-content: flex-start;
	}

  &__left {
    color: #fff;

    .logo {
      margin-bottom: 20px;
    }

    h1 {
      text-align: left;
      font-size: 40px;
      font-weight: 500;
      line-height: 64px;
			margin-top: 250px;
			margin-right: 50px;
			margin-bottom: 25px;
			max-width: 700px;

			@media (max-width: 1200px) {
				margin-top: 120px;
				margin-right: 0;
			}

			@media (max-width: 576px) {
				font-size: 25px;
				font-weight: 500;
				line-height: 40px;
			}
    }

    .desc {
      font-size: 20px;
      font-weight: 500;
      line-height: 35px;
      max-width: 840px;
      margin-bottom: 55px;
			margin-right: 50px;

			@media (max-width: 1200px) {
				margin-right: 0;
			}

			@media (max-width: 576px) {
				font-size: 15px;
				line-height: 26px;
			}
    }

    .in-action {
			display: flex;
			align-items: center;
			gap: 20px;
			cursor: pointer;
			margin-left: 10px;
    }

		.get-started {
			cursor: pointer;
			background: #fff;
			width: 320px;
			position: absolute;
			bottom: 30px;
			left: calc(50% - 160px);
			color: #0E1D40;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			height: 50px;
		}
  }

  &__form {
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
