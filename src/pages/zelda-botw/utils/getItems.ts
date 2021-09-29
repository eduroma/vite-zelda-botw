import items from '../data/items'
import { ItemType } from '../data/items.type'
import { itensCategory } from '../enums/itensCategory'

const emptyItem = {
  name: '',
  icon: '',
  value: '',
  description: '',
  category: itensCategory.WEAPONS,
}

const getItems = (
  category = itensCategory.WEAPONS,
  itemsPerPage = 20
): ItemType[] => {
  const itemsGrid = items[category].concat(
    new Array(itemsPerPage - items[category].length).fill(emptyItem)
  )

  return itemsGrid
}

export default getItems
