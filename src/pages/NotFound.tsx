import { Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
	return (
		<Container maxWidth="lg" sx={{ py: 2 }}>
			<h1>Oh no... Page not found !</h1>
			<p>Here are some helpful links:</p>
			<Link to="/">Home</Link>
		</Container>
	)
}

export default NotFound
