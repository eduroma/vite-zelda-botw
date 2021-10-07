/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

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
}) => (
  <div
    onClick={() => {
      setPage([page, 0])
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

export default CategoriesMenuItem
