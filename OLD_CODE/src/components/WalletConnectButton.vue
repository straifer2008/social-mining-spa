<template>
  <G-Button
    color="primary"
    rounded
    outline
    class="wallet-connect-button"
    @click="onWalletConnectClick"
  >
    <svg width="24" height="16">
      <use href="/img/icons/icons-symbol.svg#walletconnect-logo" />
    </svg>
    Connect with WalletConnect
  </G-Button>
</template>

<script>
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

export default {
  emits: ['walletReceived'],
  name: 'WalletConnectButton',
  data() {
    return {
      connector: null
    }
  },
  methods: {
    async onWalletConnectClick() {
      this.initWalletConnect()
      await this.connector.createSession()
      // Subscribe to connection event
      this.connector.on('connect', this.onWalletConnect.bind(this))
    },

    async walletDisconect() {
      console.log('walletDisconect')
      if (this.connector) {
        this.connector.off('connect')
        this.connector.off('session_update')

        try {
          await this.connector.killSession()
        } catch (err) {
          console.log(err)
        }
      }
    },

    onWalletConnect(error, payload) {
      if (error) {
        throw error
      }
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0]
      // Check chain ID
      if (chainId !== import.meta.env.VITE_ETHEREUM_CHAIN_ID) {
        console.log(
          'You have selected the wrong network for your Grand Token withdrawal address. Please make sure to connect an ERC-20 wallet with Polygon Network Selected. Here is the tutorial on how to add Polygon Network to your wallet: {link}'
        )
        return
      }

      const wallet = accounts[0]
      console.log('wallet', wallet)
      this.$emit('walletReceived', wallet)
    },
    initWalletConnect() {
      this.connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      })

      // Check if connection is already established
      if (this.connector.connected) {
        // Set wallet
        const wallet = this.connector.accounts[0]
        console.log('wallet', wallet)
        this.$emit('walletReceived', wallet)
      }

      this.connector.on('session_update', this.onWalletConnect.bind(this))
    }
  },
  unmounted() {
    this.walletDisconect()
  }
}
</script>

<style lang="scss">
.wallet-connect-button {
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    fill: var(--primary);
    transition: 0.3s;
  }

  &:hover {
    svg {
      fill: #fff;
    }
  }
}
</style>
