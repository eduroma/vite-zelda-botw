import React from 'react'
import { ItemType } from '../data/items.type'
import Item from './Item'

type Props = {
  items: ItemType[]
}

const ItemsGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
      {items.map((item, index) => (
        <Item
          // eslint-disable-next-line react/no-array-index-key
          key={`${item.name}-${index}`}
          name={item.name}
          icon={item.icon}
          value={item.value}
          itemIndex={index}
        />
      ))}
    </div>
  )
}

export default ItemsGrid
