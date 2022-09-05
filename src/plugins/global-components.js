import GInput from '@/components/ui-elements/form/GInput.vue'
import GCheckbox from '@/components/ui-elements/form/GCheckbox.vue'
import GSelect from '@/components/ui-elements/form/GSelect.vue'
import GButton from '@/components/ui-elements/GButton.vue'
import GCard from '@/components/ui-elements/GCard.vue'

export default {
  async install(app) {
    app.component('GInput', GInput)
    app.component('GCheckbox', GCheckbox)
    app.component('GSelect', GSelect)
    app.component('GButton', GButton)
    app.component('GCard', GCard)
  }
}
