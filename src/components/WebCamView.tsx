import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { getCameraApiFromWindow } from "../utils/camera-controls"

const Container = styled.div``

interface Props {
  source: string | undefined
}

const WebCamView = (props: Props) => {
  const { source } = props

  const containerRef = useRef<HTMLDivElement>(null)

  // Change camera source
  useEffect(() => (source ? getCameraApiFromWindow().setSource(source) : undefined), [source])

  // Mount camera view to DOM
  useEffect(() => {
    const { current } = containerRef
    if (!current) {
      return
    }

    current.appendChild(getCameraApiFromWindow().getCameraNode())
  })

  return <Container ref={containerRef} />
}

export default WebCamView
