import React, { useState, useEffect } from 'react'
import { isPlainObject, debounce } from '@pnpm-monorepo/shared'
import Upload from '@/components/upload'
import './App.css'

function App() {
  const [num, setNum] = useState(0)
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('{} isPlainObject->', isPlainObject({}))
    console.log('react isPlainObject->', isPlainObject(Object.create(React)))
  })

  const changeVal = () => {
    setNum(num + 1)
  }

  const handleClick = debounce<[React.MouseEvent, string]>((e, name) => {
    console.log('handleClick', e, name)
    changeVal()
  })
  return (
    <>
      <h3 onClick={(e) => handleClick(e, 'name')}>debounce 点击{num}</h3>
      <h3 onClick={() => setCount(count + 1)}>点击{count}</h3>
      <Upload />
    </>
  )
}

export default App
