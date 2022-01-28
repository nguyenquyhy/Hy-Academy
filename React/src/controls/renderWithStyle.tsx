import _ from 'lodash'
import { render } from '@testing-library/react'
import sass from 'sass'
import { FunctionComponent, ReactElement } from 'react'

// Ref: https://github.com/testing-library/jest-dom/issues/70#issuecomment-703281176

type RenderOptions = {
  wrapper?: FunctionComponent | undefined
  stylesheet?: string
}

const renderWithStyle = (ui: ReactElement, options: RenderOptions = {}) => {
  const view = render(ui, {
    ..._.omit(options, 'stylesheet'),
  })
  if (options.stylesheet) {
    const styles = sass.compileString(options.stylesheet)

    const styleElement = document.createElement('style')
    styleElement.innerHTML = styles.css.toString()
    document.body.appendChild(styleElement)
    document.body.appendChild(view.container)
  }

  return view
}

export default renderWithStyle