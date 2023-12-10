import { CartProvider } from '~/context/cart-context'
import { Header } from '../../components/header'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
	return (
		<CartProvider>
			<div className="mx-auto grid min-h-screen w-full max-w-[1660px] grid-rows-[min-content_max-content] gap-5 p-8">
				<Header />
				{children}
			</div>
		</CartProvider>
	)
}
