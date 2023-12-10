'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
	productId: number
	quantity: number
}

interface CartContextType {
	items: CartItem[]
	addToCart: (productId: number) => void
}

const initialContext: CartContextType = {
	items: [],
	addToCart: (productId: number) => undefined
}

export const CartContext = createContext<CartContextType>(initialContext)

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	function addToCart(productId: number) {
		setCartItems(oldState => {
			const productInCart = oldState.some(item => item.productId === productId)

			if (productInCart) {
				return oldState.map(item => {
					if (item.productId === productId) {
						return {
							...item,
							quantity: item.quantity + 1
						}
					}

					return item
				})
			}

			return [...oldState, { productId, quantity: 1 }]
		})
	}

	return (
		<CartContext.Provider value={{ items: cartItems, addToCart }}>{children}</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
