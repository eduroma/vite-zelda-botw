import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders app', async () => {
    const { getByText } = render(<App />)
    expect(getByText('Hello')).toBeDefined()
  })
})
