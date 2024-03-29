import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  animateParams: {
    rotate: string
    x: [number, number, number]
    y: [number, number, number]
  }
  className: string
}

const Triangle: React.FC<Props> = ({ animateParams, className }) => (
  <motion.div
    initial={animateParams}
    animate={animateParams}
    transition={{
      repeat: Infinity,
      repeatType: 'loop',
    }}
    className={className}
  />
)

export default Triangle
