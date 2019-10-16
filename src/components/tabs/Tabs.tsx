import React, { useState, ReactElement } from "react"
import styled from "styled-components"
import Tab from "./Tab"
import { TabContentProps } from "./TabContent"

const Container = styled.div`
  & > .header {
    display: flex;
    justify-content: space-between;
  }
`

interface Props {
  children: Array<ReactElement<TabContentProps>>
}

const Tabs = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const { children } = props

  return (
    <Container>
      <header className="header">
        {children.map(
          (child, index) =>
            child && (
              <Tab
                key={index}
                active={index === selectedTab}
                label={child.props.label}
                onSelect={() => setSelectedTab(index)}
              />
            )
        )}
      </header>
      <div>{children.map((child, index) => index === selectedTab && child)}</div>
    </Container>
  )
}

export default Tabs
