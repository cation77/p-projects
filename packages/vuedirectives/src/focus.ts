import { DirectiveBinding } from 'vue'

const focus = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    binding.value && el.focus()
  },
  update(el: HTMLElement, binding: DirectiveBinding) {
    binding.value && el.focus()
  }
}

export default focus
