import { env } from '~/env'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
	const baseUrl = env.NEXT_PUBLIC_API_BASE_URL

	const apiPrefix = '/api'

	const url = new URL(apiPrefix.concat(path), baseUrl)

	const response = await fetch(url, init)

	return await response.json()
}
