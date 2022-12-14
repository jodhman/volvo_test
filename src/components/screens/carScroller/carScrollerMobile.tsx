import { CarType } from '../../../types/cars'
import {
  CAR_BLOCK_WIDTH_MOBILE,
  CarBlock,
} from '../../organisms/carBlock/carBlock'
import { MobileScroller } from '../../organisms/mobileScroller/mobileScroller'

type Props = {
  cars: CarType[]
}

export const CarScrollerMobile = ({ cars }: Props) => {
  return (
    <>
      <MobileScroller itemBlockSpace={CAR_BLOCK_WIDTH_MOBILE}>
        {cars.map((car) => (
          <CarBlock key={car.id} car={car} />
        ))}
      </MobileScroller>
    </>
  )
}
