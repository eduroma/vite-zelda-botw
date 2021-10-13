/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useRef, useEffect, useContext } from 'react'
import { useSound } from 'use-sound'
import ItemsGrid from './components/ItemsGrid'
import ItemsContext from './hooks/ItemsContext'
import getItems, { emptyItem } from './utils/getItems'
import {
  goUp,
  goDown,
  goRight,
  goLeft,
  getIndexFromMatrixPosition,
  getMatrixPositionFromIndex,
  COLUMNS_NUMBER,
} from './utils/keyboardNavigation'
import linkImage from './assets/bg.png'
import ItemInformation from './components/ItemInformation'
import { ItemsBonusType, ItemsPage, ItemType } from './data/items.type'
import CategoriesMenu from './components/CategoriesMenu'
import NavigationArrow, {
  NavigationArrowVariant,
} from './components/NavigationArrow'
import navigateToDirection from './utils/navigateToDirection'
import BonusList from './components/BonusList'

// @ts-ignore
import selectSound from './assets/sounds/select.mp3'
// @ts-ignore
import actionSound from './assets/sounds/action.mp3'
import SoundContext from './hooks/SoundContext'
import EnduranceGauge from './components/EnduranceGauge'

const Zelda: React.FC = () => {
  const [itemsPaginated, setItemsPaginated] = useState<ItemsPage[]>(getItems())
  const [[page, direction], setPage] = useState([0, 0])
  const [itemSelected, setItemSelected] = useState(0)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [itemsEquipped, setItemsEquipped] = useState<{
    [key: string]: ItemType
  }>({})
  const [activeBonus, setActiveBonus] = useState({
    [ItemsBonusType.FIRE]: 0,
    [ItemsBonusType.SWIMMING]: 0,
    [ItemsBonusType.CLIMBING]: 0,
  })

  const { playAction, playSelect } = useContext(SoundContext)

  const inventoryRef = useRef<HTMLDivElement>(null)

  const { items } = itemsPaginated[page]
  const isSelectedItemNotEmpty = items[itemSelected].name !== ''

  const closeModal = (): void => {
    setIsModalOpened(false)
    if (inventoryRef.current) {
      inventoryRef.current.focus()
    }
  }

  const equipItem = (): void => {
    const itemSelectedData = items[itemSelected]
    setItemsEquipped({
      ...itemsEquipped,
      [itemSelectedData.category]: itemSelectedData,
    })
    playAction()
  }

  const dropItem = (): void => {
    const newItemsPaginated = [...itemsPaginated]
    newItemsPaginated[page].items.splice(itemSelected, 1)
    newItemsPaginated[page].items.push(emptyItem)
    setItemsPaginated(newItemsPaginated)
    playAction()
  }

  const contextState = {
    setItemSelected,
    itemSelected,
    isModalOpened,
    setIsModalOpened,
    closeModal,
    equipItem,
    dropItem,
    itemsEquipped,
  }

  const handleKeyPressed = (event: React.KeyboardEvent): void => {
    let newItemSelected = null
    const positionItemSelected = getMatrixPositionFromIndex(itemSelected)

    switch (event.key) {
      case 'ArrowUp':
        newItemSelected = goUp(positionItemSelected)
        playSelect()
        break
      case 'ArrowDown':
        newItemSelected = goDown(positionItemSelected)
        playSelect()
        break
      case 'ArrowLeft':
        if (positionItemSelected.y === 0) {
          navigateToDirection(-1, page, setPage)
        }
        newItemSelected = goLeft(positionItemSelected)
        playSelect()
        break
      case 'ArrowRight':
        if (positionItemSelected.y === COLUMNS_NUMBER - 1) {
          navigateToDirection(1, page, setPage)
        }
        newItemSelected = goRight(positionItemSelected)
        playSelect()
        break
      case 'Enter':
        if (isSelectedItemNotEmpty) {
          setIsModalOpened(!isModalOpened)
        }
        playAction()
        break
      default:
        break
    }

    if (newItemSelected) {
      setItemSelected(getIndexFromMatrixPosition(newItemSelected))
    }
  }

  useEffect(() => {
    const bonusEquipped = Object.values(itemsEquipped).map((item) => item.bonus)

    const defaultAccumulator = {
      [ItemsBonusType.FIRE]: 0,
      [ItemsBonusType.SWIMMING]: 0,
      [ItemsBonusType.CLIMBING]: 0,
    }

    const newActiveBonus = bonusEquipped.reduce((accumulator, currentValue) => {
      if (currentValue) {
        accumulator[currentValue] += 1
      }
      return accumulator
    }, defaultAccumulator)

    setActiveBonus(newActiveBonus)
  }, [itemsEquipped])

  useEffect(() => {
    if (inventoryRef.current) {
      inventoryRef.current.focus()
    }
  }, [])

  return (
    <div
      ref={inventoryRef}
      onKeyDown={handleKeyPressed}
      className="bg-zelda-darkGreen min-h-screen pt-10 font-calamity outline-none"
      tabIndex={0}
      role="button"
    >
      <div className="container mx-auto flex flex-col xl:flex-row">
        <div className="flex flex-col justify-center w-full max-w-2xl mx-auto xl:w-1/2 relative xl:px-12">
          <CategoriesMenu
            categorySelected={itemsPaginated[page].mainCategory}
            setPage={setPage}
          />
          <ItemsContext.Provider value={contextState}>
            <ItemsGrid direction={direction} page={page} items={items} />
          </ItemsContext.Provider>
          <NavigationArrow
            currentPage={page}
            setPage={setPage}
            variant={NavigationArrowVariant.LEFT}
          />
          <NavigationArrow
            currentPage={page}
            setPage={setPage}
            variant={NavigationArrowVariant.RIGHT}
          />
        </div>
        <div className="flex flex-col items-center self-end xl:items-start w-full xl:w-1/2 my-6 xl:my-0">
          <img
            className="absolute hidden xl:block top-0 ml-48 z-0"
            src={linkImage}
            alt="link"
          />
          <div className="flex flex-row items-center justify-center xl:flex-col xl:absolute mb-4 xl:mb-0 xl:mt-16 xl:top-0">
            <EnduranceGauge />
            <BonusList
              fire={activeBonus.fire}
              swimming={activeBonus.swimming}
              climbing={activeBonus.climbing}
            />
          </div>

          {isSelectedItemNotEmpty && (
            <ItemInformation
              item={items[itemSelected]}
              itemsEquipped={itemsEquipped}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const [playSelect] = useSound(selectSound)
  const [playAction] = useSound(actionSound, { volume: 0.5 })
  const contextState = {
    playSelect,
    playAction,
  }
  return (
    <SoundContext.Provider value={contextState}>
      <Zelda />
    </SoundContext.Provider>
  )
}

export default App
