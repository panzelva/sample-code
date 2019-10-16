import React from "react"
import styled from "styled-components"
import Button from "../Button"

const Container = styled.div`
  & > .tab-button {
    border: 2px darkblue solid;
    border-radius: 6px;

    background-color: white;

    &.active {
      color: white;
      background-color: darkblue;
    }
  }
`

interface Props {
  label: string
  onSelect: () => void
  active?: boolean | undefined
}

const Tab = (props: Props) => {
  const { label, onSelect, active } = props
  return (
    <Container onClick={onSelect}>
      <Button
        title={label}
        onClick={onSelect}
        className={["tab-button", active ? "active" : undefined].join(" ")}
      />
    </Container>
  )
}

export default Tab
