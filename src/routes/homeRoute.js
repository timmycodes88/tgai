import { useLoaderData } from 'react-router-dom'

export async function homeLoader() {
  return null
}

/**@type {Message[]} */
export const useHomeData = () => useLoaderData()
