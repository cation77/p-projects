import { watch, ref, getCurrentInstance } from 'vue'

const useModel = <T extends Record<string | 'modelValue', unknown>>(
  props: T,
  key: keyof T,
  emit?: any
) => {
  const vm = getCurrentInstance()
  const _emit = emit || vm?.emit
  const event = `update:${String(key)}`
  const proxy = ref(props[key])
  watch(
    // @ts-ignore
    () => proxy[key],
    (val) => _emit(event, val)
  )
}

export default useModel
