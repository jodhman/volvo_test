import {
  Children,
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Flex } from 'vcc-ui'

import { IndexBlock } from '../../atoms/indexBlock'
import { mobileScrollerStyles } from './mobileScroller.styles'

type Props = {
  children: ReactNode
  itemBlockSpace: number
}

export const MobileScroller = ({ children, itemBlockSpace }: Props) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 0

  const handleIndexClick = (index: number) => {
    if (index >= Children.count(children) || index < 0) {
      return
    }

    setActiveIndex(index)

    const element = wrapperRef.current
    if (!element) {
      return
    }
    const offset = 35
    element.scrollTo({
      left: index * (itemBlockSpace + offset),
      behavior: 'smooth',
    })
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      handleIndexClick(isLeftSwipe ? activeIndex + 1 : activeIndex - 1)
    } else {
      handleIndexClick(activeIndex)
    }
  }

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) {
      return
    }
    setActiveIndex(0)
    element.scrollTo({ left: 0, behavior: 'smooth' })
  }, [children])

  return (
    <>
      <Flex
        ref={wrapperRef}
        style={mobileScrollerStyles.wrapper}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </Flex>
      <Flex style={mobileScrollerStyles.indexBlockWrapper}>
        {Array.from({ length: Children.count(children) }).map((_, index) => {
          return (
            <IndexBlock
              key={index}
              isActive={activeIndex === index}
              onClick={() => handleIndexClick(index)}
            />
          )
        })}
      </Flex>
    </>
  )
}
