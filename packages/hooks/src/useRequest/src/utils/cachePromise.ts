type CahcedKey = string | number
const cachePromise = new Map<CahcedKey, Promise<any>>()

export const getCachePromise = (cacheKey: CahcedKey) => {
  return cachePromise.get(cacheKey)
}

export const setCachePromise = (cacheKey: CahcedKey, promise: Promise<any>) => {
  cachePromise.set(cacheKey, promise)

  promise
    .then((res) => {
      cachePromise.delete(cacheKey)
      return res
    })
    .catch(() => {
      cachePromise.delete(cacheKey)
    })
}
