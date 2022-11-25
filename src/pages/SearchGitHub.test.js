import React from 'react'
import { render, fireEvent,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchGitHub from './SearchGitHub'

const setup = () => {
  //Fetching Textfield and button from  render
	render(<SearchGitHub />)
	const input = screen.getByLabelText('Search Github Api')
	const button = screen.getByRole('button', { name: 'Fetch GitHub' })
	return {
		input,
		button
	}
}

test('should render a disabled button', () => {
	const { button } = setup()
	expect(button).toHaveAttribute('disabled')
	expect(button).toBeDisabled()
})

test('set value for Text Field', () => {
	const { input } = setup()
	fireEvent.change(input, { target: { value: 'Argentina' } })
	expect(input.value).toBe('Argentina')
})

test('should render  a enabled button', () => {
	const { input, button } = setup()
	fireEvent.change(input, { target: { value: 'Brasil' } })
	expect(input.value).toBe('Brasil')
	expect(button).toBeEnabled()
})

test('testing Submit button with loading indicator', () => {
	const { input, button } = setup()
	fireEvent.change(input, { target: { value: 'Brasil' } })
	fireEvent(
		button,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		})
	)
	
	screen.getByRole('button', {
		name: /Loading.../i
	})
})
