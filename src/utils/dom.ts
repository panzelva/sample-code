import { ClientCoords } from "../types"

export const getPositionInRelationOfRect = (coords: ClientCoords, element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const x = coords.clientX - rect.left
  const y = coords.clientY - rect.top
  return { x, y }
}

export const areCoordsInsideElement = (coords: ClientCoords, element: HTMLElement): boolean => {
  const { clientX, clientY } = coords
  const { left, right, top, bottom } = element.getBoundingClientRect()
  return clientX >= left && clientX <= right && clientY >= top && clientY <= bottom
}
