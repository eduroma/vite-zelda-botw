import { Dispatch, SetStateAction } from 'react'

const navigateToDirection = (
  newDirection: number,
  currentPage: number,
  setPage: Dispatch<SetStateAction<[number, number]>>,
  maxPage = 2
): void => {
  setPage([
    Math.min(Math.max(currentPage + newDirection, 0), maxPage),
    newDirection,
  ])
}

export default navigateToDirection
