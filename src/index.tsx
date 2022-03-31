import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyles as BaseStyles } from 'twin.macro'

import App from './App'

const container = document.createElement('div')
container.id = 'app'
document.body.append(container)

const root = createRoot(container)
root.render(
  <StrictMode>
    <BaseStyles />
    <App />
  </StrictMode>,
)
