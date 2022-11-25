import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Octokit } from 'octokit'
import {
	Box,
	Container,
	FormControl,
	Grid,
	Card,
	IconButton,
	InputLabel,
	Input,
	InputAdornment,
	Skeleton,
	Paper,
	Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Close from '@mui/icons-material/Close'
import CardItems from '../components/Card'
import RadioButtonsGroup from '../components/RadioButtonsGroup'
import {
	getGitHubCachedResults,
	setGitHubCachedResults
} from '../utils/getGitHubCachedResults'

const octokit = new Octokit({
	auth: process.env.REACT_APP_GIT_HUB_PERSONAL_TOKEN
})

function SearchGitHub() {
	const [data, setData] = useState([])
	let { searchKey } = useParams()
	const [inputValue, setInputValue] = useState('')
	const [isFetchingData, fetchingData] = useState(false)
	const [totalCount, setTotalCount] = useState()
	const [filterValue, setFilter] = useState('users')

	const fetchGitApi = async (searchKey) => {
		fetchingData(true)

		const queryString = `q=${searchKey}${
			filterValue === `organisations`
				? `+${encodeURIComponent('type:org')}`
				: ''
		}`
		const url = `GET /search/users?${queryString}`

		try {
			const cachedData = getGitHubCachedResults(`${searchKey}:${filterValue}`)

			if (cachedData !== undefined) {
				setData(cachedData)
			} else {
				const response = await octokit.request(url, {})
				const data = setGitHubCachedResults(
					`${searchKey}:${filterValue}`,
					response.data.items
				)
				setData(data === undefined ? [] : data)
				setTotalCount(response.data.total_count)
			}
		} catch (error) {
			console.log('data not load', error)
		}
		fetchingData(false)
	}

	useEffect(() => {
		console.log('useeEffect>>>>', searchKey)
		if (!searchKey) return
		fetchGitApi(searchKey)
	}, [])

	const handleChange = (e) => {
		e.preventDefault()
		setInputValue(e.target.value)
	}

	const handleFilter = (e) => {
		e.preventDefault()
		setFilter(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		fetchGitApi(inputValue)
	}

	const removeSearch = (e) => {
		e.preventDefault()
		setData([])
		setInputValue('')
		setTotalCount()
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography
				tabIndex="0"
				variant="h1"
				sx={{
					fontSize: '2rem',
					color: '#1F242D',
					fontWeight: 700,
					fontFamily: '"Nunito", sans-serif'
				}}
			>
				Seach for GitHub?
			</Typography>

			<Box
				component="form"
				sx={{
					display: 'flex',
					pt: 4
				}}
			>
				<FormControl sx={{ mb: 5, width: '100%' }} variant="standard">
					<InputLabel htmlFor="search-input">Search Github Api</InputLabel>
					<Input
						id="search-input"
						value={inputValue}
						onChange={handleChange}
						// startAdornment={
						// 	<InputAdornment position="start">
						// 		<Search />
						// 	</InputAdornment>
						// }
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={removeSearch}
									//aria-label="Remove input value"
								>
									<Close />
								</IconButton>
							</InputAdornment>
						}
					/>
					<RadioButtonsGroup
						handleFilter={handleFilter}
						radioValue={filterValue}
					/>
					<LoadingButton
						sx={{ mb: 1 }}
						onClick={handleSubmit}
						disabled={!inputValue || isFetchingData}
						loading={isFetchingData}
						loadingIndicator="Loading…"
						variant="outlined"
					>
						Fetch GitHub
					</LoadingButton>

                  <h4>Total Results:{totalCount}</h4>
					{totalCount === 0 && data.length === 0 && (
						<Box
							component="div"
							sx={{
								mt: 5,
								border: '1px dashed #1976d2',
								width: '100%'
							}}
						>
							<Paper
								variant="h1"
								sx={{
									p: 2,
									fontSize: '2rem',
									textAlign: 'center',
									color: '#1976d2',
									fontWeight: 700,
									fontFamily: '"Nunito", sans-serif'
								}}
							>
								Results Not found
							</Paper>
						</Box>
					)}
				</FormControl>
			</Box>

			<Grid container spacing={4}>
				{(isFetchingData ? Array.from(new Array(3)) : data).map(
					(item, index) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={3}
							key={isFetchingData ? index : item.id}
						>
							{item ? (
								<CardItems item={item} />
							) : (
								<Card>
									<Skeleton variant="rectangular" width="100%" height="16rem" />
								</Card>
							)}
						</Grid>
					)
				)}
			</Grid>
		</Container>
	)
}

export default SearchGitHub
