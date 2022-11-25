import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function RadioButtonsGroup({ handleFilter, radioValue }) {
	useEffect(() => {}, [radioValue])

	return (
		<FormControl sx={{ my: 5 }}>
			<FormLabel id="radio-buttons-group-label">
				Filter by Organizations or users
			</FormLabel>
			<RadioGroup
				row
				aria-labelledby="radio-buttons-group-label"
				name="radio-buttons-group"
				onChange={handleFilter}
				value={radioValue}
			>
				<FormControlLabel value="users" control={<Radio />} label="Users" />
				<FormControlLabel
					value="organisations"
					control={<Radio />}
					label="Organisations"
				/>
			</RadioGroup>
		</FormControl>
	)
}

RadioButtonsGroup.propTypes = {
	radioValue: PropTypes.string.isRequired,
	handleFilter: PropTypes.func.isRequired
}
