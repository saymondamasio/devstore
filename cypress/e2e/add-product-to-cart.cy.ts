describe('add product to cart', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should be able to navigate to the product page and add it to the cart', () => {
		cy.get('a[href^="/products"]').first().click()

		cy.location('pathname').should('include', '/products')
		cy.contains('Adicionar ao carrinho').click()

		cy.contains('Cart (1)').should('exist')
	})

	it('should not count duplicated on cart', () => {
		cy.get('a[href^="/products"]').first().click()

		cy.location('pathname').should('include', '/products')
		cy.contains('Adicionar ao carrinho').click()
		cy.contains('Adicionar ao carrinho').click()

		cy.contains('Cart (1)').should('exist')
	})

	it('should be able to search for a product and add it to the cart', () => {
		cy.searchByQuery('moletom')

		cy.location('pathname').should('include', '/search')

		cy.get('a[href^="/products"]').first().click()
		cy.location('pathname').should('include', '/products')
		cy.contains('Adicionar ao carrinho').click()

		cy.contains('Cart (1)').should('exist')
	})
})
