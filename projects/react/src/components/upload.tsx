import { useEffect } from 'react'
import pLimit from '@pnpm-monorepo/p-limit'

const mockFetch = (arg: unknown) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('mockFetch, resolve arg')
      resolve(arg)
    }, 1000)
  })
}

export default function Upload() {
  useEffect(() => {
    const limit = pLimit(2)
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const request = list.map((item) => limit(mockFetch, item))
    Promise.all(request).then((result) => {
      console.log('request result->', result)
    })
  }, [])

  return <div>123</div>
}
