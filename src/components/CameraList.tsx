import React from "react"
import { Camera } from "../types"
import styled from "styled-components"
import Button from "./Button"

const Container = styled.div`
  width: 600px;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;

  & .btn {
    margin-bottom: 20px;
  }
`

interface Props {
  cameras: Camera[]
  onCameraSelect: (camera: Camera) => void
}

const CameraList = (props: Props) => {
  const { cameras, onCameraSelect } = props

  return (
    <Container>
      <div>
        {cameras.map(camera => (
          <Button
            className="btn"
            title={camera.name}
            key={camera.id}
            onClick={() => onCameraSelect(camera)}
          />
        ))}
      </div>
    </Container>
  )
}

export default CameraList
