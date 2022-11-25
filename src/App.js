import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SearhGitHub from './pages/SearchGitHub'
import NotFound from './pages/NotFound.tsx'

export default function Routing() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="github/search">
				<Route path=":searchKey" element={<SearhGitHub />} />
				<Route path="" element={<SearhGitHub />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}
