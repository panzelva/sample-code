import React, { useRef, useState } from "react"
import styled, { css } from "styled-components"
import { getCameraApiFromWindow } from "../utils/camera-controls"
import { useInterval } from "react-use"
import { ClientCoords } from "../types"
import { getPositionInRelationOfRect, areCoordsInsideElement } from "../utils/dom"

interface StyledProps {
  holdingDown: boolean
}

const Container = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 600px;
  height: 400px;

  & > .control-circle {
    width: 200px;
    height: 200px;

    border-radius: 50%;
    border: 1px black solid;

    ${({ holdingDown }) =>
      holdingDown &&
      css`
        cursor: move;
      `};
  }
`

const MAP_MOVEMENT_THROTTLE = 0.2
const MAP_MOVEMENT_INTERVAL = 25

const Controls = () => {
  const controlRef = useRef<HTMLDivElement>(null)

  const [isHoldingDown, setIsHoldingDown] = useState(false)
  const [isUserInsideCircle, setIsUserInsideCircle] = useState(true)

  const [referencePoint, setReferencePoint] = useState({ x: 0, y: 0 })
  const [userPoint, setUserPoint] = useState({ x: 0, y: 0 })

  useInterval(
    () => {
      const x = (userPoint.x - referencePoint.x) * MAP_MOVEMENT_THROTTLE
      const y = (referencePoint.y - userPoint.y) * MAP_MOVEMENT_THROTTLE
      getCameraApiFromWindow().move(x, y)
    },
    isHoldingDown && isUserInsideCircle ? MAP_MOVEMENT_INTERVAL : null
  )

  const onPressDown = (e: ClientCoords) => {
    const { current } = controlRef
    if (!current) {
      return
    }

    const position = getPositionInRelationOfRect(e, current)
    setReferencePoint(position)
    setUserPoint(position)
    setIsHoldingDown(true)
  }

  const onUp = () => {
    setIsHoldingDown(false)
    setReferencePoint({ x: 0, y: 0 })
    setUserPoint({ x: 0, y: 0 })
  }

  const onMove = (e: ClientCoords) => {
    const { current } = controlRef
    if (!isHoldingDown || !current) {
      return
    }

    const position = getPositionInRelationOfRect(e, current)
    setUserPoint(position)
  }

  const onTouchMove = (e: ClientCoords) => {
    const { current } = controlRef
    if (!isHoldingDown || !current) {
      return
    }

    const isInside = areCoordsInsideElement(e, current)
    setIsUserInsideCircle(isInside)

    onMove(e)
  }

  return (
    <Container holdingDown={isHoldingDown}>
      <div
        ref={controlRef}
        className="control-circle"
        // Mouse events
        onMouseDown={onPressDown}
        onMouseUp={onUp}
        onMouseMove={onMove}
        onMouseLeave={() => setIsUserInsideCircle(false)}
        onMouseEnter={() => setIsUserInsideCircle(true)}
        // Touch events
        onTouchStart={e => onPressDown(e.touches[0])}
        onTouchEnd={onUp}
        onTouchMove={e => onTouchMove(e.touches[0])}
      />
    </Container>
  )
}

export default Controls
