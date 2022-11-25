import React from 'react'
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RadioButtonsGroup from './RadioButtonsGroup'

const setup = () => {
	//Fetching RadioButtonsGroup
	const handleFilter = (ev) => {
		ev.preventDefault()
	}

	render(<RadioButtonsGroup radioValue="users" handleFilter={handleFilter} />)
	const userRadioButton = screen.getByRole('radio', { name: 'Users' })
	const organisationsRadioButton = screen.getByRole('radio', {
		name: 'Organisations'
	})
	//const radioButton = screen.getByLabelText('Filter by Organizations or users')
	return {
		userRadioButton,
		organisationsRadioButton
	}
}

test('should render a radio GroupButton with users checked checked at first render', () => {
	const { userRadioButton } = setup()
	expect(userRadioButton.checked).toBe(true)
})

test('should not render a radio GroupButton with organistions checked at first render', () => {
	const { organisationsRadioButton } = setup()
	expect(organisationsRadioButton.checked).toBe(false)
})
