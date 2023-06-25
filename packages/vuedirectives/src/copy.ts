import { DirectiveBinding } from 'vue'

interface IElement extends HTMLElement {
  targetValue: string
}

const copy = {
  beforeMount(el: IElement, binding: DirectiveBinding) {
    el.targetValue = binding.value
    if (!el.targetValue) return
    el.addEventListener('click', () => {
      const textarea = document.createElement('textarea')
      textarea.readOnly = true
      textarea.style.display = 'none'
      textarea.value = el.targetValue
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    })
  },
  updated(el: IElement, binding: DirectiveBinding) {
    el.targetValue = binding.value
  },
  unmounted(el: IElement) {
    el.removeEventListener('click', () => null)
  }
}

export default copy
