export const COLUMNS_NUMBER = 5
export const ROWS_NUMBER = 4

type PositionType = {
  x: number
  y: number
}

export const getMatrixPositionFromIndex = (index: number): PositionType => {
  const rowIndex = Math.floor(index / COLUMNS_NUMBER)
  const columnIndex = index % COLUMNS_NUMBER
  return { x: rowIndex, y: columnIndex }
}

export const getIndexFromMatrixPosition = (
  matrixPosition: PositionType
): number => {
  return matrixPosition.x * COLUMNS_NUMBER + matrixPosition.y
}

export const goUp = (position: PositionType): PositionType => ({
  x: Math.max(position.x - 1, 0),
  y: position.y,
})

export const goDown = (position: PositionType): PositionType => ({
  x: Math.min(position.x + 1, ROWS_NUMBER - 1),
  y: position.y,
})

export const goLeft = (position: PositionType): PositionType => {
  const newPosition = position.y - 1
  return {
    x: position.x,
    y: newPosition < 0 ? COLUMNS_NUMBER - 1 : newPosition,
  }
}

export const goRight = (position: PositionType): PositionType => {
  const newPosition = position.y + 1
  return {
    x: position.x,
    y: newPosition % COLUMNS_NUMBER,
  }
}
