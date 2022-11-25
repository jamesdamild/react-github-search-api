const gitHubResultsCacheMap = new Map()

const getGitHubCachedResults = (searchKey) => {
	return gitHubResultsCacheMap.get(searchKey)
}

const setGitHubCachedResults = (searchKey, results) => {
	gitHubResultsCacheMap.set(searchKey, results)
	return gitHubResultsCacheMap.get(searchKey)
}

export { getGitHubCachedResults, setGitHubCachedResults }
