import React from 'react'
import { Card, CardHeader, CardMedia, Link } from '@mui/material'
import { useEffect } from 'react'

const CardItems = ({ item }) => {
	useEffect(() => {}, [item])

	return (
		<Card style={{ borderRadius: '14px', border: '1px solid #1976d2' }}>
			<CardHeader
				aria-label="github user"
				title={
					String(item.login).length < 10
						? item.login
						: String(item.login).substring(0, 10) + '...'
				}
				subheader={item.type}
				sx={{ display: 'inline-block', padding: '9px' }}
			/>
			<CardHeader
				tabIndex="7"
				aria-label="github Link profile"
				subheader="Github"
				sx={{ display: 'inline-block', float: 'right', padding: '9px' }}
				title={<Link href={item.html_url}>Profile</Link>}
			/>
			<CardMedia
				alt={item.login}
				component="img"
				height="250"
				image={item.avatar_url}
			/>
		</Card>
	)
}

export default CardItems
