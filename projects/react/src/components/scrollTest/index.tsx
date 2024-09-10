import { useRef, useEffect } from 'react'
import './index.less'

type IProps = {
  textList: string[]
  delay?: number
}

const ScrollText = ({ textList, delay = 1000 }: IProps) => {
  const scrollContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (textList?.length > 1) {
      const timer = setInterval(() => {
        if (!scrollContainer.current) return
        const cells = scrollContainer.current?.children
        try {
          const headDom = cells[0]
          headDom.classList.add('mh-0')
          if (!headDom.classList.contains('placeholder-row')) {
            const tailDom = headDom.cloneNode(true) as Element
            tailDom.classList.remove('mh-0')
            scrollContainer.current?.appendChild(tailDom)
          }
          setTimeout(() => {
            scrollContainer.current?.removeChild(headDom)
          }, 600)
        } catch (e) {
          clearInterval(timer)
        }
      }, delay)

      return () => clearInterval(timer)
    }
  }, [delay, textList])

  return (
    <div className="price-alert-scroll-box">
      {(!textList || textList.length < 1) && (
        <div className="default-container"></div>
      )}
      {textList.length > 0 && (
        <div className="scroll-container" ref={scrollContainer}>
          {textList.map((item) => (
            <div className="scroll-row" key={item}>
              <span className="scroll-cell">
                <span className="cell-content">{item}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ScrollText
