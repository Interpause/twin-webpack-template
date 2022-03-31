import tw, { css, styled } from 'twin.macro'
import { useState } from 'react'

import test from './test.json'
import logo from './logo.svg?url'

/* twin.macro styled component */
const RedText = tw.p`text-red-400`

/* emotion styled component wrapping twin.macro component */
const CodeRedText = styled(RedText)`
  code {
    ${tw`text-green-400`}
  }
`

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div tw='absolute inset-0 bg-gray-900 text-white text-center'>
      <img src={logo} tw='mx-auto h-52'></img>
      <p>
        {test.msg} --- Version: {process.env.VERSION_NAME}
      </p>
      {/*mix of tw & css properties*/}
      <CodeRedText
        tw='font-bold'
        css={css`
          code {
            font-style: italic;
          }
        `}
      >
        This line uses all major features of <code>twin.macro</code>!
      </CodeRedText>
      <button
        tw='bg-blue-700 rounded p-2 hover:(ring-4 ring-blue-500) active:bg-blue-900'
        onClick={() => setCount(count + 1)}
      >
        {count == 0 ? 'Click Me!' : `Clicked ${count} times`}
      </button>
    </div>
  )
}
