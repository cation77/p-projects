import { DirectiveBinding } from 'vue'

const longPress = {
  beforeMounted(el: HTMLElement, binding: DirectiveBinding) {
    const cb = binding.value
    if (typeof cb !== 'function') return
    const delay = Number(binding.modifiers.delay) || 1000
    let timeout: ReturnType<typeof setTimeout> | null = null
    const cancel = () => {
      if (timeout !== null) {
        clearTimeout(timeout)
        timeout = null
      }
    }
    el.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.type === 'click' && e.button !== 0) return
      e.preventDefault()
      if (timeout === null) {
        timeout = setTimeout(() => {
          cb()
          timeout = null
        }, delay)
      }
    })
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mousedown', () => null)
    el.removeEventListener('mouseout', () => null)
    el.removeEventListener('click', () => null)
  }
}
export default longPress
