import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { api } from '~/data/api'
import { type Product } from '~/data/types/product'

interface SearchProps {
	searchParams: {
		q: string
	}
}

async function searchProducts(query: string): Promise<Product[]> {
	const products = await api<Product[]>(`/products/search?q=${query}`, {
		next: {
			revalidate: 60 * 60 // 1 hour
		}
	})

	return products
}

export default async function SearchPage({ searchParams }: SearchProps) {
	const { q: query } = searchParams

	if (!query) {
		redirect('/')
	}

	const products = await searchProducts(query)

	return (
		<div className="flex flex-col gap-4">
			<p className="text-sm ">
				Resultado para: <span className="font-semibold">{query}</span>
			</p>

			<div className="grid grid-cols-3 gap-6">
				{products.map(product => (
					<Link
						key={product.id}
						href={`/products/${product.slug}`}
						className="group relative flex justify-center overflow-hidden rounded-lg bg-zinc-900"
					>
						<Image
							src={product.image}
							width={480}
							height={480}
							quality={90}
							alt=""
							className="transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
							<span className="truncate text-sm">{product.title}</span>
							<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
								{product.price.toLocaleString('pt-BR', {
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
		</div>
	)
}
