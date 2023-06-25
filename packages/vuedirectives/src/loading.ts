import { DirectiveBinding } from 'vue'

interface IElement extends HTMLElement {
  $instance: HTMLElement | null
  $domInserted: boolean
}

function toggleLoading(el: IElement, binding: DirectiveBinding) {
  if (binding.value && el.$instance) {
    insertDom(el, binding)
  } else {
    el.$instance?.parentNode &&
      el.$instance.parentNode.removeChild(el.$instance)
  }
}

function getStyle(el: HTMLElement, attr: keyof CSSStyleDeclaration) {
  return window.getComputedStyle(el, null)[attr]
}

function insertDom(el: IElement, binding: DirectiveBinding) {
  const styles: Partial<CSSStyleDeclaration> = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '1000',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
  const instance = el.$instance!
  Object.keys(styles).forEach((property: any) => {
    instance.style[property] = styles[property]!
  })

  if (
    !['fixed', 'absolute', 'relative'].includes(
      getStyle(el, 'position') as string
    )
  ) {
    el.style.position = 'relative'
  }
  el.appendChild(instance)
  el.$domInserted = true
}

const loading = {
  beforeMount(el: IElement, binding: DirectiveBinding) {
    el.$instance = document.createElement('div')
    el.$instance.innerHTML = 'loading...'
    binding.value = toggleLoading(el, binding)
  },
  updated(el: IElement, binding: DirectiveBinding) {
    binding.oldValue !== binding.value && toggleLoading(el, binding)
  },
  unmounted(el: IElement, binding: DirectiveBinding) {
    el.$domInserted && toggleLoading(el, { ...binding, value: false })
    el.$instance && (el.$instance = null)
  }
}

export default loading
