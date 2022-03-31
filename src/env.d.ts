import 'twin.macro'
import styledImport from '@emotion/styled'
import { css as cssImport } from '@emotion/react'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

//typings for asset modules
declare global {
  /** import asset contents as string */
  declare module '*?raw' {
    const v: string
    export default v
  }
  /** import url for asset */
  declare module '*?url' {
    const v: string
    export default v
  }
  /** import asset encoded as base64 dataURL */
  declare module '*?inline' {
    const v: string
    export default v
  }

  /** replaced by webpack.EnvironmentPlugin at compile time */
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      /** app version name */
      VERSION_NAME: string
    }
  }
}
