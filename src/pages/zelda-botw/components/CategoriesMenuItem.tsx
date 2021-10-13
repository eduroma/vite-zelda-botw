/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction, useContext } from 'react'
import cx from 'classnames'
import SoundContext from '../hooks/SoundContext'

type Props = {
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  isSelected: boolean
}

const CategoriesMenuItem: React.FC<Props> = ({
  page,
  setPage,
  isSelected,
  children,
}) => {
  const { playAction } = useContext(SoundContext)

  return (
    <div
      onClick={() => {
        setPage([page, 0])
        playAction()
      }}
      className={cx(
        {
          'text-white border-white': isSelected,
          'text-zelda-lightGray border-zelda-lightGray': !isSelected,
        },
        'border-b cursor-pointer'
      )}
    >
      {children}
    </div>
  )
}

export default CategoriesMenuItem
