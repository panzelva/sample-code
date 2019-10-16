import React, { useState } from "react"
import useFetch from "react-fetch-hook"
import styled from "styled-components"
import CameraList from "./components/CameraList"
import Controls from "./components/Controls"
import TabContent from "./components/tabs/TabContent"
import Tabs from "./components/tabs/Tabs"
import WebCamView from "./components/WebCamView"
import Reset from "./styles/Reset"
import { Camera } from "./types"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > .image-wrapper,
  & > .tabs-wrapper {
    padding: 20px;
  }
`

const camerasUrl = "http://runningios.com/screamingbox/cameras.json"

const App = () => {
  const { data, isLoading, error } = useFetch<Camera[]>(camerasUrl)
  const [cameraSource, setCameraSource] = useState<undefined | string>(undefined)

  if (isLoading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error!</div>
  }

  return (
    <>
      <Reset />
      <Container>
        <div className="image-wrapper">
          <WebCamView source={cameraSource} />
        </div>
        <div className="tabs-wrapper">
          <Tabs>
            <TabContent label="Camera List">
              <CameraList
                cameras={data || []}
                onCameraSelect={camera => setCameraSource(camera.source)}
              />
            </TabContent>
            <TabContent label="Controls">
              <Controls />
            </TabContent>
          </Tabs>
        </div>
      </Container>
    </>
  )
}

export default App
