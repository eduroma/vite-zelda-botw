import React, { Dispatch, SetStateAction } from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'
import navigateToDirection from '../utils/navigateToDirection'

export enum NavigationArrowVariant {
  LEFT = 'left',
  RIGHT = 'right',
}

type Props = {
  currentPage: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  variant: NavigationArrowVariant
  maxPage?: number
}

const NavigationArrow: React.FC<Props> = ({
  currentPage,
  setPage,
  variant,
  maxPage = 2,
}) => {
  const isLeftArrow = variant === NavigationArrowVariant.LEFT
  const isDisabled =
    (isLeftArrow && currentPage === 0) ||
    (!isLeftArrow && currentPage === maxPage)

  return (
    <div
      className={cx(
        { 'left-0': isLeftArrow, 'right-0': !isLeftArrow },
        'absolute h-full md:flex items-center z-30'
      )}
    >
      <motion.img
        initial={false}
        animate={{
          rotate: isLeftArrow ? '-180deg' : '0deg',
          scale: isDisabled ? [1, 1, 1] : [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
        }}
        onClick={() =>
          isLeftArrow
            ? navigateToDirection(-1, currentPage, setPage)
            : navigateToDirection(1, currentPage, setPage)
        }
        className={cx(
          {
            'opacity-50': isDisabled,
            'cursor-pointer': currentPage !== 0,
            'transform rotate-180': isLeftArrow,
          },
          'h-16'
        )}
        src="icons/arrow-no-curve.png"
      />
    </div>
  )
}

NavigationArrow.defaultProps = {
  maxPage: 2,
}

export default NavigationArrow
