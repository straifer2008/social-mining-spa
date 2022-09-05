<template>
  <form class="g-form" @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'GForm',
  data() {
    return {
      validateFields: []
    }
  },
  methods: {
    onSubmit() {
      let valid = false
      if (this.validateFields.length) {
        valid = this.validateFields.every(async (el) => {
          console.log('el.ref', el.ref)
          return await !el.type.methods.errorHandler()
        })
        this.$emit('onSubmit', { valid })
      } else {
        console.warn('fields with rules nit find')
      }
      return valid
    },
    getFieldsWithRules() {
      if (this.$slots.default) {
        const searchFunc = (el) => el.props?.rules
        this.validateFields = this.$slots.default().filter(searchFunc)
        this.$slots.default().forEach((item) => {
          const childrenValidateFields =
            Array.isArray(item.children) && item.children?.filter(searchFunc)
          if (childrenValidateFields?.length) {
            this.validateFields = [
              ...this.validateFields,
              ...childrenValidateFields
            ]
          }
        })

        console.log('getFieldWithRules', this.validateFields)
      }
    }
  },
  mounted() {
    this.getFieldsWithRules()
  },
  watch: {
    // $refs: {
    //   deep: true,
    //   immediate: true,
    //   handler(val) {
    //     console.log('GForm refs', val)
    //   }
    // }
  }
}
</script>

<style lang="scss"></style>
