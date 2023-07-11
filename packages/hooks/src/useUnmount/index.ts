import { useEffect, useRef } from 'react'

const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn)
  useEffect(
    () => () => {
      fnRef.current()
    },
    []
  )
}

export default useUnmount
