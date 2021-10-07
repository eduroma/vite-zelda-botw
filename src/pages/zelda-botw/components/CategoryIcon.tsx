import React from 'react'
import { ItemCategoriesType } from '../data/items.type'
import Armor from './Icons/Armor'
import Shield from './Icons/Shield'
import Weapon from './Icons/Weapon'

const categoryMapping = {
  [ItemCategoriesType.SHIELD]: Shield,
  [ItemCategoriesType.ARMOR]: Armor,
  [ItemCategoriesType.WEAPON]: Weapon,
  [ItemCategoriesType.HELM]: Armor,
  [ItemCategoriesType.GREAVE]: Armor,
}

type Props = {
  type: ItemCategoriesType
}

const CategoryIcon: React.FC<Props> = ({ type }) => {
  const SelectedCategoryIcon = categoryMapping[type]

  return <SelectedCategoryIcon className="fill-current w-12 px-4 text-white" />
}

export default CategoryIcon
