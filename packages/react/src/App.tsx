import React, { useEffect } from 'react'
import { isPlainObject, debounce } from '@pnpm-monorepo/shared'
import Upload from '@/components/upload'
import './App.css'

function App() {
  useEffect(() => {
    console.log('{} isPlainObject->', isPlainObject({}))
    console.log('react isPlainObject->', isPlainObject(Object.create(React)))
  })

  const handleClick = debounce<[React.MouseEvent, string]>((e, name) => {
    console.log('handleClick', e, name)
  }, 2000)
  return (
    <>
      <h3 onClick={(e) => handleClick(e, 'name')}>点击</h3>
      <Upload />
    </>
  )
}

export default App
