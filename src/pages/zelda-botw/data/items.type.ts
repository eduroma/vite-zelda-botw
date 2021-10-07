export enum ItemsMainCategoriesType {
  WEAPONS = 'weapons',
  SHIELDS = 'shields',
  ARMORS = 'armors',
}

export enum ItemCategoriesType {
  ARMOR = 'armor',
  SHIELD = 'shield',
  WEAPON = 'weapon',
  HELM = 'helm',
  GREAVE = 'greave',
}

export type ItemType = {
  name: string
  category: ItemCategoriesType
  icon: string
  value: string
  description: string
  bonus?: string
  isNew?: boolean
}

export type ItemsPage = {
  items: ItemType[]
  mainCategory: ItemsMainCategoriesType
  page: number
}

export type ItemsType = {
  [key: string]: ItemType[]
}
