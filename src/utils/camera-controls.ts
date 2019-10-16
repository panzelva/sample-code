export type WebCam = {
  move: (x: number, y: number) => void
  setSource: (source: string) => void
  getCameraNode: () => HTMLElement
}

export const getCameraApiFromWindow = (): WebCam => {
  // @ts-ignore
  return window.WebCam
}
