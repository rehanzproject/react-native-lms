import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const SkeletonLoaderOneBar = () => (
  <ContentLoader 
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#959596"
  >
    <Rect x="0" y="30" rx="3" ry="3" width="380" height="6" /> 
  </ContentLoader>
)

export default SkeletonLoaderOneBar
