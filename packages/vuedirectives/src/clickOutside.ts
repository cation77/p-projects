import { DirectiveBinding } from 'vue'

const clickOutside = {
  beforeMount(el: Element, binding: DirectiveBinding) {
    document.addEventListener(
      'click',
      (e: Event) => {
        // 如果点击范围在绑定的元素范围内，那么将不执行指令操作，而是执行原点击事件
        !el.contains(e.target as HTMLElement) && binding.value()
      },
      false
    )
  },
  unmounted() {
    document.removeEventListener('click', () => null)
  }
}

export default clickOutside
