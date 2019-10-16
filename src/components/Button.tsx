import React from "react"
import styled from "styled-components"

const Container = styled.button`
  display: block;

  width: 120px;
  height: 40px;

  background-color: lightgray;
  border-radius: 6px;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: darkgrey;
  }
`

interface Props {
  title: string
  onClick: () => void
  className?: string | undefined
}

const Button = (props: Props) => {
  const { className, title, onClick } = props
  return (
    <Container className={className} onClick={onClick}>
      {title}
    </Container>
  )
}

export default Button
