import React from 'react'

import { CarType } from '../../../types/cars'
import { CarBlock } from '../../organisms/carBlock/carBlock'
import { DesktopScroller } from '../../organisms/desktopScroller/desktopScroller'

type Props = {
  cars: CarType[]
}

export const CarScrollerDesktop = ({ cars }: Props) => {
  return (
    <>
      <DesktopScroller itemBlockSpace={386}>
        {cars.map((car) => (
          <CarBlock key={car.id} car={car} />
        ))}
      </DesktopScroller>
    </>
  )
}
