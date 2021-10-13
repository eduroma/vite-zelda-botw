/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react'
import cx from 'classnames'

import ItemsContext from '../hooks/ItemsContext'
import TrianglesBox from './TrianglesBox'
import Modal from './Modal'
import { ItemCategoriesType, ItemsBonusType } from '../data/items.type'
import BonusIcon from './BonusIcon'
import SoundContext from '../hooks/SoundContext'
import SparkleAnimation from './SparkleAnimation'

type Props = {
  name: string
  icon: string
  value: string
  category: ItemCategoriesType
  bonus?: ItemsBonusType
  itemIndex: number
  isNew?: boolean
}

const Item: React.FC<Props> = ({
  name,
  icon,
  value,
  category,
  bonus,
  itemIndex,
  isNew,
}) => {
  const {
    itemSelected,
    setItemSelected,
    isModalOpened,
    setIsModalOpened,
    itemsEquipped,
  } = useContext(ItemsContext)
  const { playAction } = useContext(SoundContext)

  const handleClick = (): void => {
    if (!isModalOpened) {
      playAction()
    }
    setItemSelected && setItemSelected(itemIndex)
    setIsModalOpened && setIsModalOpened(!isModalOpened)
  }

  const isSelected = itemSelected === itemIndex
  const isEquipped = itemsEquipped && itemsEquipped[category]?.name === name

  return (
    <div
      onClick={handleClick}
      className={cx(
        {
          'shadow-yellow border-zelda-softYellow border-2': isSelected,
          'zelda-background-item': isEquipped,
        },
        'relative w-20 h-20 bg-black border border-zelda-darkGray cursor-pointer'
      )}
    >
      {isNew && <SparkleAnimation />}
      {isSelected && !isModalOpened && <TrianglesBox />}
      {bonus && (
        <BonusIcon bonusType={bonus} className="absolute top-0 left-0" />
      )}
      <img alt={name} src={icon} />
      {value && (
        <div
          className="z-0 bg-black -mx-1 -my-1 text-sm text-white absolute 
      bottom-0 right-0 border border-zelda-darkGray px-2"
        >
          {value}
        </div>
      )}
      {isModalOpened && isSelected && <Modal />}
    </div>
  )
}

Item.defaultProps = {
  bonus: undefined,
  isNew: false,
}

export default Item
