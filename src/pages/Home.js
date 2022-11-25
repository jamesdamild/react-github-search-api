import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function Home() {
	return <Navigate to={`/github/search`} />
}
