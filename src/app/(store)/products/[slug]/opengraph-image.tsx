/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

import { api } from '~/data/api'
import { type Product } from '~/data/types/product'
import { env } from '~/env'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
	width: 1200,
	height: 630
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
	const product = await api<Product>(`/products/${slug}`, {
		next: {
			revalidate: 60 * 60 // 1 hour
		}
	})

	return product
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
	// Font
	const interSemiBold = fetch(
		new URL('/src/assets/fonts/Inter-SemiBold.ttf', import.meta.url)
	).then(async res => await res.arrayBuffer())

	const product = await getProduct(params.slug)

	const productImageUrl = new URL(product.image, env.API_URL).toString()

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					background: colors.zinc[950],
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<img src={productImageUrl} alt="" style={{ width: '100%' }} />
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: 'Inter',
					data: await interSemiBold,
					style: 'normal',
					weight: 400
				}
			]
		}
	)
}
