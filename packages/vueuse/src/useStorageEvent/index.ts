import { ref, onMounted, onUnmounted } from 'vue'

// 保障输入，使用全局状态响应，需要先注册 key
const storageKeys = ['globalState'] as const
type GlobalStorageKeys = (typeof storageKeys)[number]

export type IEventData<T = any> = {
  key: string
  value: T
}

const listenerEventName = 'storage'

const storageKeyPrefix = '_global_storage_data_'

const customEvent = new EventTarget()

const getStorageKey = (key: string) => `${storageKeyPrefix}${key}`

const parseStorageValue = (value: any) => {
  return value ? JSON.parse(value) : value
}

export const clearStorageKeys = () => {
  storageKeys.forEach((key) => {
    localStorage.removeItem(getStorageKey(key))
  })
}

export const sendStorageEvent = (
  subscribeKey: GlobalStorageKeys,
  value: any
) => {
  const storageKey = getStorageKey(subscribeKey)
  value = JSON.stringify(value)
  localStorage.setItem(storageKey, value)
  customEvent.dispatchEvent(
    new CustomEvent(listenerEventName, { detail: { key: storageKey, value } })
  )
}

// 通过监听 storage 事件，跨 iframe、页面间共享全局状态。不依赖后端服务接口
const useStorageEvent = <T = any>(subscribeKey: GlobalStorageKeys) => {
  const storageKey = getStorageKey(subscribeKey)

  const subscribeValue = ref<IEventData<T>['value'] | null>(null)

  const listenerEvent = (event: StorageEvent | CustomEvent) => {
    if (event instanceof CustomEvent) {
      const { key, value } = event.detail as IEventData<T>
      if (key === storageKey) {
        subscribeValue.value = parseStorageValue(value)
      }
    } else {
      const { key, newValue } = event as StorageEvent
      if (key === storageKey) {
        subscribeValue.value = parseStorageValue(newValue)
      }
    }
  }

  const sendEvent = (value: IEventData<T>['value'] | string) => {
    value = JSON.stringify(value)
    localStorage.setItem(storageKey, value)
    customEvent.dispatchEvent(
      new CustomEvent(listenerEventName, { detail: { key: storageKey, value } })
    )
  }

  onMounted(() => {
    const value = localStorage.getItem(storageKey)
    subscribeValue.value = parseStorageValue(value)
    window.addEventListener(listenerEventName, listenerEvent)
    customEvent.addEventListener(
      listenerEventName,
      listenerEvent as EventListener
    )
  })

  onUnmounted(() => {
    window.removeEventListener(listenerEventName, listenerEvent)
    customEvent.removeEventListener(
      listenerEventName,
      listenerEvent as EventListener
    )
  })

  return [subscribeValue, sendEvent]
}

export default useStorageEvent
