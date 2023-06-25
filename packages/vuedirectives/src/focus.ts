import { DirectiveBinding } from 'vue'

const focus = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    binding.value && el.focus()
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    binding.value && el.focus()
  }
}

export default focus
