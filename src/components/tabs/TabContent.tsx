import React, { ReactNode } from "react"

export interface TabContentProps {
  label: string
  children: ReactNode
}

const TabContent = (props: TabContentProps) => {
  return <>{props.children}</>
}

export default TabContent
