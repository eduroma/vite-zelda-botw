import React, { useState, useRef, useEffect } from 'react'
import ItemsGrid from './components/ItemsGrid'
import ItemsContext from './hooks/ItemsContext'
import getItems from './utils/getItems'
import {
  goUp,
  goDown,
  goRight,
  goLeft,
  getIndexFromMatrixPosition,
  getMatrixPositionFromIndex,
} from './utils/keyboardNavigation'

const Zelda: React.FC = () => {
  const [itemSelected, setItemSelected] = useState(0)
  const contextState = {
    setItemSelected,
    itemSelected,
  }
  const inventoryRef = useRef<HTMLDivElement>(null)

  const handleKeyPressed = (event: React.KeyboardEvent): void => {
    let newItemSelected = null
    const positionItemSelected = getMatrixPositionFromIndex(itemSelected)
    if (event.key === 'ArrowUp') {
      newItemSelected = goUp(positionItemSelected)
    } else if (event.key === 'ArrowDown') {
      newItemSelected = goDown(positionItemSelected)
    } else if (event.key === 'ArrowLeft') {
      newItemSelected = goLeft(positionItemSelected)
    } else if (event.key === 'ArrowRight') {
      newItemSelected = goRight(positionItemSelected)
    }

    if (newItemSelected) {
      setItemSelected(getIndexFromMatrixPosition(newItemSelected))
    }
  }

  useEffect(() => {
    if (inventoryRef.current) {
      inventoryRef.current.focus()
    }
  }, [])

  return (
    <div
      ref={inventoryRef}
      onKeyDown={handleKeyPressed}
      className="bg-zelda-darkGreen min-h-screen pt-32"
      tabIndex={0}
    >
      <div className="container mx-auto flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/2">
          <ItemsContext.Provider value={contextState}>
            <ItemsGrid items={getItems()} />
          </ItemsContext.Provider>
        </div>
        <div className="w-full xl:w-1/2" />
      </div>
    </div>
  )
}

export default Zelda
