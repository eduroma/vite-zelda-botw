/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react'
import cx from 'classnames'

import ItemsContext from '../hooks/ItemsContext'
import TrianglesBox from './TrianglesBox'

type Props = {
  name: string
  icon: string
  value: string
  itemIndex: number
}

const Item: React.FC<Props> = ({ name, icon, value, itemIndex }) => {
  const { itemSelected, setItemSelected } = useContext(ItemsContext)

  const handleClick = (): void => {
    setItemSelected && setItemSelected(itemIndex)
  }

  const isSelected = itemSelected === itemIndex

  return (
    <div
      onClick={handleClick}
      className={cx(
        {
          'shadow-yellow border-zelda-softYellow border-2':
            itemSelected === itemIndex,
        },
        'relative w-20 h-20 bg-black border border-zelda-darkGray cursor-pointer'
      )}
    >
      {isSelected && <TrianglesBox />}
      <img alt={name} src={icon} />
      <div
        className="z-0 bg-black -mx-1 -my-1 text-sm text-white absolute 
      bottom-0 right-0 px-2 border border-zelda-darkGray"
      >
        {value}
      </div>
    </div>
  )
}

export default Item
