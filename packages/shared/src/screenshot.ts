import html2canvas from 'html2canvas'
import type { Options } from 'html2canvas'
import { isString, isDOMElement } from './index'

const screenshot = async (
  el?: HTMLElement | string | null,
  options?: Partial<Options>
) => {
  let dom: HTMLElement | null = null
  if (isDOMElement(el)) {
    dom = el
  } else if (isString(el)) {
    dom = document.querySelector(el)
  } else {
    dom = dom || document.body
  }
  const canvas: HTMLCanvasElement = await html2canvas(dom!, {
    allowTaint: false,
    ...options
  })
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = `screenshot.png`
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(a.href)
  }, 10)
  return { status: true, message: 'screenshot success' }
}

export default screenshot
