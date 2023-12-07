import Image from 'next/image'
import Link from 'next/link'

import { api } from '~/data/api'
import { type Product } from '~/data/types/product'

async function getFeaturedProducts(): Promise<Product[]> {
	const response = await api('/products/featured')

	const products = await response.json()

	return products
}

export default async function Home() {
	const [highlightProduct, ...otherProducts] = await getFeaturedProducts()

	return (
		<div className="grid max-h-[870px] grid-cols-9 grid-rows-6 gap-6">
			<Link
				href={`/products/${highlightProduct.slug}`}
				className="group relative col-span-6 row-span-6 flex justify-center overflow-hidden rounded-lg bg-zinc-900"
			>
				<Image
					src={highlightProduct.image}
					width={860}
					height={860}
					quality={100}
					alt={highlightProduct.title}
					className="transition-transform duration-500 group-hover:scale-105"
				/>

				<div className="absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
					<span className="truncate text-sm">${highlightProduct.title}</span>
					<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
						{highlightProduct.price.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0
						})}
					</span>
				</div>
			</Link>

			{otherProducts.map(product => (
				<Link
					key={product.id}
					href={`/product/${product.slug}`}
					className="group relative col-span-3 row-span-3 flex justify-center overflow-hidden rounded-lg bg-zinc-900"
				>
					<Image
						src={product.image}
						width={860}
						height={860}
						quality={100}
						alt={product.title}
						className="transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
						<span className="truncate text-sm">{product.title}</span>
						<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
							{highlightProduct.price.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
								minimumFractionDigits: 0,
								maximumFractionDigits: 0
							})}
						</span>
					</div>
				</Link>
			))}
		</div>
	)
}
